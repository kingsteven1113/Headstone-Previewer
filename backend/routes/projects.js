import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { ApiError } from '../middleware/errorHandler.js';
import { prisma } from '../utils/prisma.js';
import { getProjectLimitForPlan, getProjectLimitMessage } from '../utils/subscriptionRules.js';

const router = express.Router();

// Get all projects for authenticated user
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const userProjects = await prisma.project.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(userProjects);
  } catch (error) {
    next(error);
  }
});

// Get single project
router.get('/:projectId', verifyToken, async (req, res, next) => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: req.params.projectId,
        userId: req.userId,
      },
    });

    if (!project) {
      return next(new ApiError(404, 'Project not found'));
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
});

// Create new project
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { title, type, color, shape, designStyle, name, wording, accessories } = req.body;

    if (!title || !title.trim()) {
      return next(new ApiError(400, 'Project title is required'));
    }

    const userRecord = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        subscription: {
          select: {
            planName: true,
          },
        },
      },
    });

    if (!userRecord) {
      return next(new ApiError(404, 'User account not found'));
    }

    const projectLimit = getProjectLimitForPlan(userRecord.subscription?.planName);
    if (projectLimit !== null) {
      const projectCount = await prisma.project.count({
        where: { userId: req.userId },
      });

      if (projectCount >= projectLimit) {
        return next(new ApiError(403, getProjectLimitMessage(userRecord.subscription?.planName)));
      }
    }

    const newProject = await prisma.project.create({
      data: {
        userId: req.userId,
        title: title.trim(),
        type: type || 'Custom',
        color: color || 'Custom',
        shape: shape || 'Custom',
        designStyle: designStyle || 'Standard',
        name: name || '',
        wording: wording || '',
        accessories: Array.isArray(accessories) ? accessories : [],
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// Update project
router.put('/:projectId', verifyToken, async (req, res, next) => {
  try {
    const existingProject = await prisma.project.findFirst({
      where: {
        id: req.params.projectId,
        userId: req.userId,
      },
    });

    if (!existingProject) {
      return next(new ApiError(404, 'Project not found'));
    }

    const payload = {
      title: req.body.title,
      type: req.body.type,
      color: req.body.color,
      shape: req.body.shape,
      designStyle: req.body.designStyle,
      name: req.body.name,
      wording: req.body.wording,
      accessories: req.body.accessories,
    };

    const sanitizedData = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined)
    );

    if (sanitizedData.title !== undefined && !String(sanitizedData.title).trim()) {
      return next(new ApiError(400, 'Project title cannot be empty'));
    }

    if (sanitizedData.title !== undefined) {
      sanitizedData.title = String(sanitizedData.title).trim();
    }

    if (sanitizedData.accessories !== undefined && !Array.isArray(sanitizedData.accessories)) {
      sanitizedData.accessories = [];
    }

    const updatedProject = await prisma.project.update({
      where: { id: req.params.projectId },
      data: sanitizedData,
    });

    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
});

// Delete project
router.delete('/:projectId', verifyToken, async (req, res, next) => {
  try {
    const deleteResult = await prisma.project.deleteMany({
      where: {
        id: req.params.projectId,
        userId: req.userId,
      },
    });

    if (deleteResult.count === 0) {
      return next(new ApiError(404, 'Project not found'));
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
