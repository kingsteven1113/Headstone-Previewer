import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Previewer.css';
import Modal from '../Modal/Modal';
import { saveProject, getSavedProjects, deleteProject, updateProject } from '../../utils/savedProjects';
import { useAuth } from '../../context/AuthContext';
import { canSaveProjects, canUseAdvancedPreviewer, getAdvancedPreviewerMessage, getSaveProjectMessage } from '../../utils/accessRules';
import { DEFAULT_DESIGN_STYLE } from '../../utils/designStyles';
import { resolvePreviewCombination } from '../../utils/previewCombinationResolver';
import { PREVIEW_CATALOG } from '../../utils/previewCatalog';
import { getStepRequirements, isShapeDisabledForType, isAccessoryDisabledForSelection } from '../../utils/previewResolver';
import Logo from '../../assets/Headstone Previewer Logo.png';
import Impala_Black from '../../assets/Casillas 2.jpg';
import Barre_Grey from '../../assets/Coakley.jpeg';
import North_American_Pink from '../../assets/Dockendorf.png';
import Mahogany from '../../assets/Ferdinand V.jpeg';
import Cats_Eye from '../../assets/Stockhamer.jpeg';
import Evergreen from '../../assets/Seredynski.jpeg';
import Jet_Black from '../../assets/Rivera.jpg';
import Blue_Pearl from '../../assets/Anderson.JPG';
import Tropical_Green from '../../assets/Meier.jpeg';
import Paradiso from '../../assets/Krieger.jpg';
import Bahama_Blue from '../../assets/Terleph.JPG';

import Heart_Shape from '../../assets/Martinez heart.jpg';
import Angel_Carved from '../../assets/Rende.jpg';
import Flat_Top from '../../assets/Weldon.JPG';
import Serpentine_Top from '../../assets/Conforti.jpeg';
import Oval_Top from '../../assets/Carpenter 2.jpg';
import Half_Serpentine_Top from '../../assets/Walker.jpg';
import Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Apex_Top from '../../assets/Thorsen back.jpeg';
import Roof_Top from '../../assets/Camacho.jpeg';

import Die_And_Base from '../../assets/Casillas 2.jpg';
import Impala_Black_Die_And_Base from '../../assets/Casillas 2.jpg';
import Impala_Black_Die_And_Base_Heart_Shape from '../../assets/Martinez heart.jpg';
import Impala_Black_Die_And_Base_Angel_Carved from '../../assets/Weitsma 1.jpg';
import Impala_Black_Die_And_Base_Flat_Top from '../../assets/Weldon.JPG';
import Impala_Black_Die_And_Base_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Die_And_Base_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Barre_Grey_Die_And_Base from '../../assets/Coakley.jpeg';
import Barre_Grey_Die_And_Base_Heart_Shape from '../../assets/Gabrielli3.jpg';
import Barre_Grey_Die_And_Base_Angel_Carved from '../../assets/Rende.jpg';
import Barre_Grey_Die_And_Base_Flat_Top from '../../assets/Shappe.JPG';
import Barre_Grey_Die_And_Base_Serpentine_Top from '../../assets/Coakley.jpeg';
import Barre_Grey_Die_And_Base_Oval_Top from '../../assets/Smith.jpg';
import Barre_Grey_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Barre_Grey_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Barre_Grey_Die_And_Base_Apex_Top from '../../assets/Thorsen back.jpeg';
import Barre_Grey_Die_And_Base_Roof_Top from '../../assets/Camacho.jpeg';

import North_American_Pink_Die_And_Base from '../../assets/Conforti.jpeg';
import North_American_Pink_Die_And_Base_Heart_Shape from '../../assets/Cinelli.jpg';
import North_American_Pink_Die_And_Base_Angel_Carved from '../../assets/Angel Heart 2.jpg';
import North_American_Pink_Die_And_Base_Flat_Top from '../../assets/Finnigan.jpg';
import North_American_Pink_Die_And_Base_Serpentine_Top from '../../assets/Conforti.jpeg';
import North_American_Pink_Die_And_Base_Oval_Top from '../../assets/Zmudzinski.jpg';
import North_American_Pink_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Mahogany_Die_And_Base from '../../assets/Ferdinand V.jpeg';
import Mahogany_Die_And_Base_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Die_And_Base_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Die_And_Base_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Die_And_Base_Serpentine_Top from '../../assets/Ferdinand V.jpeg';
import Mahogany_Die_And_Base_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Cats_Eye_Die_And_Base from '../../assets/Stockhamer.jpeg';
import Cats_Eye_Die_And_Base_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Die_And_Base_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Die_And_Base_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Die_And_Base_Serpentine_Top from '../../assets/Stockhamer.jpeg';
import Cats_Eye_Die_And_Base_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Evergreen_Die_And_Base from '../../assets/Seredynski.jpeg';
import Evergreen_Die_And_Base_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Die_And_Base_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Die_And_Base_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Die_And_Base_Serpentine_Top from '../../assets/Seredynski.jpeg';
import Evergreen_Die_And_Base_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Jet_Black_Die_And_Base from '../../assets/Rivera.jpg';
import Jet_Black_Die_And_Base_Heart_Shape from '../../assets/Mason.jpg';
import Jet_Black_Die_And_Base_Angel_Carved from '../../assets/Weitsma 1.jpg';
import Jet_Black_Die_And_Base_Flat_Top from '../../assets/Weldon.JPG';
import Jet_Black_Die_And_Base_Serpentine_Top from '../../assets/Rivera.jpg';
import Jet_Black_Die_And_Base_Oval_Top from '../../assets/Milkovich.jpeg';
import Jet_Black_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Blue_Pearl_Die_And_Base from '../../assets/Anderson.JPG';
import Blue_Pearl_Die_And_Base_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Die_And_Base_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Die_And_Base_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Die_And_Base_Serpentine_Top from '../../assets/Anderson.JPG';
import Blue_Pearl_Die_And_Base_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Tropical_Green_Die_And_Base from '../../assets/Meier.jpeg';
import Tropical_Green_Die_And_Base_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Die_And_Base_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Die_And_Base_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Die_And_Base_Serpentine_Top from '../../assets/Meier.jpeg';
import Tropical_Green_Die_And_Base_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Paradiso_Die_And_Base from '../../assets/Krieger.jpg';
import Paradiso_Die_And_Base_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Die_And_Base_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Die_And_Base_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Die_And_Base_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Die_And_Base_Oval_Top from '../../assets/Krieger.jpg';
import Paradiso_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Bahama_Blue_Die_And_Base from '../../assets/Giglio.jpg';
import Bahama_Blue_Die_And_Base_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Die_And_Base_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Die_And_Base_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Die_And_Base_Serpentine_Top from '../../assets/Giglio.jpg';
import Bahama_Blue_Die_And_Base_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Die_And_Base_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Die_And_Base_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Die_And_Base_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Die_And_Base_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Monolith from '../../assets/Wood.jpg';
import Impala_Black_Monolith from '../../assets/Wood.jpg';
import Impala_Black_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Monolith_Angel_Carved from '../../assets/Casillas 2.jpg';
import Impala_Black_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Monolith_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Monolith_Oval_Top from '../../assets/Wood.jpg';
import Impala_Black_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Impala_Black_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Barre_Grey_Monolith from '../../assets/Walker.jpg';
import Barre_Grey_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Barre_Grey_Monolith_Angel_Carved from '../../assets/Casillas 2.jpg';
import Barre_Grey_Monolith_Flat_Top from '../../assets/Ettere.jpg';
import Barre_Grey_Monolith_Serpentine_Top from '../../assets/Strandberg.jpg';
import Barre_Grey_Monolith_Oval_Top from '../../assets/Fornerod.jpg';
import Barre_Grey_Monolith_Half_Serpentine_Top from '../../assets/Walker.jpg';
import Barre_Grey_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Barre_Grey_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Barre_Grey_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import North_American_Pink_Monolith from '../../assets/Maynes.jpeg';
import North_American_Pink_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Monolith_Angel_Carved from '../../assets/Casillas 2.jpg';
import North_American_Pink_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Monolith_Serpentine_Top from '../../assets/Maynes.jpeg';
import North_American_Pink_Monolith_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Mahogany_Monolith from '../../assets/Castellano.JPG';
import Mahogany_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Monolith_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Monolith_Serpentine_Top from '../../assets/Castellano.JPG';
import Mahogany_Monolith_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Cats_Eye_Monolith from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Evergreen_Monolith from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Jet_Black_Monolith from '../../assets/Delorier.jpeg';
import Jet_Black_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Monolith_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Monolith_Flat_Top from '../../assets/Bruckenthal.webp';
import Jet_Black_Monolith_Serpentine_Top from '../../assets/Delorier.jpeg';
import Jet_Black_Monolith_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Blue_Pearl_Monolith from '../../assets/Taskovich.jpg';
import Blue_Pearl_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Monolith_Angel_Carved from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Monolith_Serpentine_Top from '../../assets/Taskovich.jpg';
import Blue_Pearl_Monolith_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Tropical_Green_Monolith from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Paradiso_Monolith from '../../assets/Reiter.jpg';
import Paradiso_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Monolith_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Monolith_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Monolith_Oval_Top from '../../assets/Reiter.jpg';
import Paradiso_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Bahama_Blue_Monolith from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Heart_Shape from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Angel_Carved from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Half_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Half_Oval_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Apex_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Monolith_Roof_Top from '../../assets/Headstone Previewer Logo.png';

import Slant_Marker from '../../assets/Brunetto.jpg';
import Impala_Black_Slant_Marker from '../../assets/Orellana.jpg';

import Impala_Black_Slant_Marker_Flat_Top from '../../assets/Pharr.jpg';
import Impala_Black_Slant_Marker_Serpentine_Top from '../../assets/Orellana.jpg';
import Impala_Black_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Barre_Grey_Slant_Marker from '../../assets/Brunetto.jpg';

import Barre_Grey_Slant_Marker_Flat_Top from '../../assets/Robinson.jpg';
import Barre_Grey_Slant_Marker_Serpentine_Top from '../../assets/Brunetto.jpg';
import Barre_Grey_Slant_Marker_Oval_Top from '../../assets/Kimbark.JPG';


import North_American_Pink_Slant_Marker from '../../assets/Fitzpatrick.JPG';

import North_American_Pink_Slant_Marker_Flat_Top from '../../assets/Fitzpatrick.JPG';
import North_American_Pink_Slant_Marker_Serpentine_Top from '../../assets/Duah.jpg';
import North_American_Pink_Slant_Marker_Oval_Top from '../../assets/Brockway front set.jpg';


import Mahogany_Slant_Marker from '../../assets/Watson.webp';

import Mahogany_Slant_Marker_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Mahogany_Slant_Marker_Serpentine_Top from '../../assets/Watson.webp';
import Mahogany_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Cats_Eye_Slant_Marker from '../../assets/Headstone Previewer Logo.png';

import Cats_Eye_Slant_Marker_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Slant_Marker_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Evergreen_Slant_Marker from '../../assets/Headstone Previewer Logo.png';

import Evergreen_Slant_Marker_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Slant_Marker_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Jet_Black_Slant_Marker from '../../assets/Sheehy.JPG';

import Jet_Black_Slant_Marker_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Slant_Marker_Serpentine_Top from '../../assets/Sheehy.JPG';
import Jet_Black_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Blue_Pearl_Slant_Marker from '../../assets/Hernandez R.jpg';

import Blue_Pearl_Slant_Marker_Flat_Top from '../../assets/Hernandez R.jpg';
import Blue_Pearl_Slant_Marker_Serpentine_Top from '../../assets/DOnofrio.jpg';
import Blue_Pearl_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Tropical_Green_Slant_Marker from '../../assets/Headstone Previewer Logo.png';

import Tropical_Green_Slant_Marker_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Slant_Marker_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Paradiso_Slant_Marker from '../../assets/Headstone Previewer Logo.png';

import Paradiso_Slant_Marker_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Slant_Marker_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Bahama_Blue_Slant_Marker from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Slant_Marker_Flat_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Slant_Marker_Serpentine_Top from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Slant_Marker_Oval_Top from '../../assets/Headstone Previewer Logo.png';


import Flush_Marker from '../../assets/Moore, Florence.JPG';
import Impala_Black_Flush_Marker from '../../assets/White.jpg';


import Barre_Grey_Flush_Marker from '../../assets/Moore, Florence.JPG';


import North_American_Pink_Flush_Marker from '../../assets/Trotman.jpg';


import Mahogany_Flush_Marker from '../../assets/Headstone Previewer Logo.png';


import Cats_Eye_Flush_Marker from '../../assets/Headstone Previewer Logo.png';


import Evergreen_Flush_Marker from '../../assets/Wu.jpeg';


import Jet_Black_Flush_Marker from '../../assets/DeMeo.jpg';


import Blue_Pearl_Flush_Marker from '../../assets/Headstone Previewer Logo.png';


import Tropical_Green_Flush_Marker from '../../assets/Headstone Previewer Logo.png';


import Paradiso_Flush_Marker from '../../assets/Headstone Previewer Logo.png';

import Bahama_Blue_Flush_Marker from '../../assets/Headstone Previewer Logo.png';


import Hickey_Marker from '../../assets/Meek installed.jpg';
import Impala_Black_Hickey_Marker from '../../assets/Headstone Previewer Logo.png';


import Barre_Grey_Hickey_Marker from '../../assets/Meek installed.jpg';


import North_American_Pink_Hickey_Marker from '../../assets/Urban.JPG';


import Mahogany_Hickey_Marker from '../../assets/Headstone Previewer Logo.png';


import Cats_Eye_Hickey_Marker from '../../assets/Headstone Previewer Logo.png';


import Evergreen_Hickey_Marker from '../../assets/Headstone Previewer Logo.png';


import Jet_Black_Hickey_Marker from '../../assets/Headstone Previewer Logo.png';


import Blue_Pearl_Hickey_Marker from '../../assets/Yessian.jpg';


import Tropical_Green_Hickey_Marker from '../../assets/Headstone Previewer Logo.png';

import Paradiso_Hickey_Marker from '../../assets/Headstone Previewer Logo.png';

import Bahama_Blue_Hickey_Marker from '../../assets/Headstone Previewer Logo.png';


import Natural_Stone from '../../assets/Lum.jpeg';
import Bench from '../../assets/Barker 1.JPG';
import Impala_Black_Bench from '../../assets/Capalbo installed.jpg';
import Barre_Grey_Bench from '../../assets/Reynolds.JPG';
import North_American_Pink_Bench from '../../assets/Gagliari.JPG';
import Mahogany_Bench from '../../assets/Schiavone Bench.jpg';
import Cats_Eye_Bench from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Bench from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Bench from '../../assets/Mayer bench 2.JPG';
import Blue_Pearl_Bench from '../../assets/Giordano 1.jpg';
import Tropical_Green_Bench from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Bench from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Bench from '../../assets/Headstone Previewer Logo.png';
import Bronze_Plaque from '../../assets/George.JPG';

import Impala_Black_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import Barre_Grey_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import North_American_Pink_Bronze_Plaque from '../../assets/George.JPG';
import Mahogany_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import Cats_Eye_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import Evergreen_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import Jet_Black_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import Blue_Pearl_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import Tropical_Green_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import Paradiso_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';
import Bahama_Blue_Bronze_Plaque from '../../assets/Headstone Previewer Logo.png';

const {
  types: ADVANCED_TYPE_OPTIONS,
  colors: ADVANCED_COLOR_OPTIONS,
  shapes: ADVANCED_SHAPE_OPTIONS,
  accessories: ADVANCED_ACCESSORY_OPTIONS,
  additionalCategories: ADVANCED_ADDITIONAL_CATEGORIES,
  additionalCategoryOptions: ADVANCED_ADDITIONAL_CATEGORY_OPTIONS,
} = PREVIEW_CATALOG.options;
const COLOR_REQUIRED_TYPES = PREVIEW_CATALOG.rules.colorRequiredTypes;
const ADVANCED_ADDITIONAL_CATEGORY_KEYS = ADVANCED_ADDITIONAL_CATEGORIES.map((category) => category.key);
const EMPTY_ADVANCED_ADDITIONAL_SELECTIONS = ADVANCED_ADDITIONAL_CATEGORY_KEYS.reduce((accumulator, categoryKey) => {
  accumulator[categoryKey] = null;
  return accumulator;
}, {});
const MISSING_PREVIEW_IMAGE_WARNED_KEYS = new Set();




const PREVIEW_IMAGE_ASSET_MAP = {
  Angel_Carved,
  Apex_Top,
  Bahama_Blue,
  Bahama_Blue_Bench,
  Bahama_Blue_Bronze_Plaque,
  Bahama_Blue_Die_And_Base,
  Bahama_Blue_Die_And_Base_Angel_Carved,
  Bahama_Blue_Die_And_Base_Apex_Top,
  Bahama_Blue_Die_And_Base_Flat_Top,
  Bahama_Blue_Die_And_Base_Half_Oval_Top,
  Bahama_Blue_Die_And_Base_Half_Serpentine_Top,
  Bahama_Blue_Die_And_Base_Heart_Shape,
  Bahama_Blue_Die_And_Base_Oval_Top,
  Bahama_Blue_Die_And_Base_Roof_Top,
  Bahama_Blue_Die_And_Base_Serpentine_Top,
  Bahama_Blue_Flush_Marker,
  Bahama_Blue_Hickey_Marker,
  Barre_Grey,
  Barre_Grey_Bench,
  Barre_Grey_Bronze_Plaque,
  Barre_Grey_Die_And_Base,
  Barre_Grey_Die_And_Base_Angel_Carved,
  Barre_Grey_Die_And_Base_Apex_Top,
  Barre_Grey_Die_And_Base_Flat_Top,
  Barre_Grey_Die_And_Base_Half_Oval_Top,
  Barre_Grey_Die_And_Base_Half_Serpentine_Top,
  Barre_Grey_Die_And_Base_Heart_Shape,
  Barre_Grey_Die_And_Base_Oval_Top,
  Barre_Grey_Die_And_Base_Roof_Top,
  Barre_Grey_Die_And_Base_Serpentine_Top,
  Barre_Grey_Flush_Marker,
  Barre_Grey_Hickey_Marker,
  Bench,
  Blue_Pearl,
  Blue_Pearl_Bench,
  Blue_Pearl_Bronze_Plaque,
  Blue_Pearl_Die_And_Base,
  Blue_Pearl_Die_And_Base_Angel_Carved,
  Blue_Pearl_Die_And_Base_Apex_Top,
  Blue_Pearl_Die_And_Base_Flat_Top,
  Blue_Pearl_Die_And_Base_Half_Oval_Top,
  Blue_Pearl_Die_And_Base_Half_Serpentine_Top,
  Blue_Pearl_Die_And_Base_Heart_Shape,
  Blue_Pearl_Die_And_Base_Oval_Top,
  Blue_Pearl_Die_And_Base_Roof_Top,
  Blue_Pearl_Die_And_Base_Serpentine_Top,
  Blue_Pearl_Flush_Marker,
  Blue_Pearl_Hickey_Marker,
  Bronze_Plaque,
  Cats_Eye,
  Cats_Eye_Bench,
  Cats_Eye_Bronze_Plaque,
  Cats_Eye_Die_And_Base,
  Cats_Eye_Die_And_Base_Angel_Carved,
  Cats_Eye_Die_And_Base_Apex_Top,
  Cats_Eye_Die_And_Base_Flat_Top,
  Cats_Eye_Die_And_Base_Half_Oval_Top,
  Cats_Eye_Die_And_Base_Half_Serpentine_Top,
  Cats_Eye_Die_And_Base_Heart_Shape,
  Cats_Eye_Die_And_Base_Oval_Top,
  Cats_Eye_Die_And_Base_Roof_Top,
  Cats_Eye_Die_And_Base_Serpentine_Top,
  Cats_Eye_Flush_Marker,
  Cats_Eye_Hickey_Marker,
  Die_And_Base,
  Evergreen,
  Evergreen_Bench,
  Evergreen_Bronze_Plaque,
  Evergreen_Die_And_Base,
  Evergreen_Die_And_Base_Angel_Carved,
  Evergreen_Die_And_Base_Apex_Top,
  Evergreen_Die_And_Base_Flat_Top,
  Evergreen_Die_And_Base_Half_Oval_Top,
  Evergreen_Die_And_Base_Half_Serpentine_Top,
  Evergreen_Die_And_Base_Heart_Shape,
  Evergreen_Die_And_Base_Oval_Top,
  Evergreen_Die_And_Base_Roof_Top,
  Evergreen_Die_And_Base_Serpentine_Top,
  Evergreen_Flush_Marker,
  Evergreen_Hickey_Marker,
  Flat_Top,
  Flush_Marker,
  Half_Oval_Top,
  Half_Serpentine_Top,
  Heart_Shape,
  Hickey_Marker,
  Impala_Black,
  Impala_Black_Bench,
  Impala_Black_Bronze_Plaque,
  Impala_Black_Die_And_Base,
  Impala_Black_Die_And_Base_Angel_Carved,
  Impala_Black_Die_And_Base_Apex_Top,
  Impala_Black_Die_And_Base_Flat_Top,
  Impala_Black_Die_And_Base_Half_Oval_Top,
  Impala_Black_Die_And_Base_Half_Serpentine_Top,
  Impala_Black_Die_And_Base_Heart_Shape,
  Impala_Black_Die_And_Base_Oval_Top,
  Impala_Black_Die_And_Base_Roof_Top,
  Impala_Black_Die_And_Base_Serpentine_Top,
  Impala_Black_Flush_Marker,
  Impala_Black_Hickey_Marker,
  Impala_Black_Monolith_Heart_Shape,
  Impala_Black_Slant_Marker_Flat_Top,
  Jet_Black,
  Jet_Black_Bench,
  Jet_Black_Bronze_Plaque,
  Jet_Black_Die_And_Base,
  Jet_Black_Die_And_Base_Angel_Carved,
  Jet_Black_Die_And_Base_Apex_Top,
  Jet_Black_Die_And_Base_Flat_Top,
  Jet_Black_Die_And_Base_Half_Oval_Top,
  Jet_Black_Die_And_Base_Half_Serpentine_Top,
  Jet_Black_Die_And_Base_Heart_Shape,
  Jet_Black_Die_And_Base_Oval_Top,
  Jet_Black_Die_And_Base_Roof_Top,
  Jet_Black_Die_And_Base_Serpentine_Top,
  Jet_Black_Flush_Marker,
  Jet_Black_Hickey_Marker,
  Logo,
  Mahogany,
  Mahogany_Bench,
  Mahogany_Bronze_Plaque,
  Mahogany_Die_And_Base,
  Mahogany_Die_And_Base_Angel_Carved,
  Mahogany_Die_And_Base_Apex_Top,
  Mahogany_Die_And_Base_Flat_Top,
  Mahogany_Die_And_Base_Half_Oval_Top,
  Mahogany_Die_And_Base_Half_Serpentine_Top,
  Mahogany_Die_And_Base_Heart_Shape,
  Mahogany_Die_And_Base_Oval_Top,
  Mahogany_Die_And_Base_Roof_Top,
  Mahogany_Die_And_Base_Serpentine_Top,
  Mahogany_Flush_Marker,
  Mahogany_Hickey_Marker,
  Monolith,
  Natural_Stone,
  North_American_Pink,
  North_American_Pink_Bench,
  North_American_Pink_Bronze_Plaque,
  North_American_Pink_Die_And_Base,
  North_American_Pink_Die_And_Base_Angel_Carved,
  North_American_Pink_Die_And_Base_Apex_Top,
  North_American_Pink_Die_And_Base_Flat_Top,
  North_American_Pink_Die_And_Base_Half_Oval_Top,
  North_American_Pink_Die_And_Base_Half_Serpentine_Top,
  North_American_Pink_Die_And_Base_Heart_Shape,
  North_American_Pink_Die_And_Base_Oval_Top,
  North_American_Pink_Die_And_Base_Roof_Top,
  North_American_Pink_Die_And_Base_Serpentine_Top,
  North_American_Pink_Flush_Marker,
  North_American_Pink_Hickey_Marker,
  Oval_Top,
  Paradiso,
  Paradiso_Bench,
  Paradiso_Bronze_Plaque,
  Paradiso_Die_And_Base,
  Paradiso_Die_And_Base_Angel_Carved,
  Paradiso_Die_And_Base_Apex_Top,
  Paradiso_Die_And_Base_Flat_Top,
  Paradiso_Die_And_Base_Half_Oval_Top,
  Paradiso_Die_And_Base_Half_Serpentine_Top,
  Paradiso_Die_And_Base_Heart_Shape,
  Paradiso_Die_And_Base_Oval_Top,
  Paradiso_Die_And_Base_Roof_Top,
  Paradiso_Die_And_Base_Serpentine_Top,
  Paradiso_Flush_Marker,
  Paradiso_Hickey_Marker,
  Roof_Top,
  Serpentine_Top,
  Tropical_Green,
  Tropical_Green_Bench,
  Tropical_Green_Bronze_Plaque,
  Tropical_Green_Die_And_Base,
  Tropical_Green_Die_And_Base_Angel_Carved,
  Tropical_Green_Die_And_Base_Apex_Top,
  Tropical_Green_Die_And_Base_Flat_Top,
  Tropical_Green_Die_And_Base_Half_Oval_Top,
  Tropical_Green_Die_And_Base_Half_Serpentine_Top,
  Tropical_Green_Die_And_Base_Heart_Shape,
  Tropical_Green_Die_And_Base_Oval_Top,
  Tropical_Green_Die_And_Base_Roof_Top,
  Tropical_Green_Die_And_Base_Serpentine_Top,
  Tropical_Green_Flush_Marker,
  Tropical_Green_Hickey_Marker,
};

const Previewer = () => {

  



  function resetSelections() {
    setSelection(initialSelection);
    setTypeSelected(initialType);
    setColorSelected(initialColor);
    setShapeSelected(initialShape);
    setActiveAdvancedStep('type');
    setActiveCoreStep('type');
    clearAccessorySelections();
    
    document.getElementById('ColorOptionsList').classList.remove('active'), 1500;
    document.getElementById('ShapeOptionsList').classList.remove('active'), 1500;
    document.getElementById('AccessoriesOptionsList').classList.remove('active'), 1500;
    
    document.querySelectorAll('.AccessorySelected, .TypeSelected, .ColorSelected, .ShapeSelected').forEach(element => element.classList.remove('AccessorySelected', 'TypeSelected', 'ColorSelected', 'ShapeSelected'));
    document.getElementById('NoCombinationMessage').classList.add('hidden');
    if (window.innerWidth < 915) {
      document.querySelectorAll('.TypeOptionsList ul, .ColorOptionsList ul, .ShapeOptionsList ul, .TypeOptionsList p, .ColorOptionsList p, .ShapeOptionsList p, .TypeOptionsList h2, .ColorOptionsList h2, .ShapeOptionsList h2').forEach(element => element.classList.remove('disappear'));
    }

  }


  const initialSelection = {
    type: null,
    color: null,
    shape: null,
    designStyle: DEFAULT_DESIGN_STYLE,
    name: null,
    ...EMPTY_ADVANCED_ADDITIONAL_SELECTIONS,
  };



  const [selection, setSelection] = useState(initialSelection);
  
useEffect(() => {

  if (selection.name === "None") {
    document.getElementById('NoCombinationMessage').classList.remove('hidden');
  } else {
    document.getElementById('NoCombinationMessage').classList.add('hidden');
  }
}, [selection]);

  const imageSrc = (selection) => {

    // Manage column visibility based on selection state
    const isColorRequiredType = COLOR_REQUIRED_TYPES.includes(selection.type);
    const hasBaseSelection = selection.type === 'Natural_Stone' || (isColorRequiredType && selection.color) || (!isColorRequiredType && selection.type !== 'Natural_Stone' && selection.shape);

    // Show Accessories for Natural_Stone immediately, or for colorRequiredTypes when color is selected, or for other types when shape is selected
    if (hasBaseSelection) {
      document.getElementById('AccessoriesOptionsList')?.classList.add('active');
    } else {
      document.getElementById('AccessoriesOptionsList')?.classList.remove('active');
    }

    // Show Shapes column for colorRequiredTypes when color is selected, or for Natural_Stone when type is selected
    if ((isColorRequiredType && selection.color) || selection.type === 'Natural_Stone') {
      document.getElementById('ShapeOptionsList')?.classList.add('active');
    } else if (!isColorRequiredType) {
      // For other types, show shapes when color is selected (normal flow already handles this)
    } else {
      document.getElementById('ShapeOptionsList')?.classList.remove('active');
    }

    // Show Colors column for Natural_Stone when type is selected
    if (selection.type === 'Natural_Stone') {
      document.getElementById('ColorOptionsList')?.classList.add('active');
    } else if (selection.type !== 'Natural_Stone') {
      // For other types, show colors when type is selected (normal flow already handles this)
    } else {
      document.getElementById('ColorOptionsList')?.classList.remove('active');
    }

    const resolvedSelection = resolvePreviewCombination(selection, PREVIEW_IMAGE_ASSET_MAP, {
      defaultImageKey: 'Logo',
    });

    if (resolvedSelection.matched && !resolvedSelection.image && !MISSING_PREVIEW_IMAGE_WARNED_KEYS.has(resolvedSelection.imageKey)) {
      MISSING_PREVIEW_IMAGE_WARNED_KEYS.add(resolvedSelection.imageKey);
      console.warn('Missing preview image asset for key:', resolvedSelection.imageKey);
    }

    selection.name = resolvedSelection.name ?? null;
    return resolvedSelection.image || Logo;
  }


document.addEventListener('DOMContentLoaded', () => {
    const triggerElement = document.querySelector('#trigger');
    const disappearingElement = document.querySelector('#sidebar');

    // Only start observing if both elements actually exist
    if (triggerElement && disappearingElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    disappearingElement.classList.add('hidden');
                }
            });
        });

        observer.observe(triggerElement);
    } else {
        console.error("One of the elements was not found in the DOM.");
    }
});

    
    
    


  const initialType = "Select Type";
  const initialColor = "Select Color";
  const initialShape = "Select Shape";
  const navigate = useNavigate();
  const { isAuthenticated, plan } = useAuth();
  const hasAdvancedPreviewerAccess = canUseAdvancedPreviewer({ isAuthenticated, plan });
  const [typeSelected, setTypeSelected] = useState(initialType);
  const [colorSelected, setColorSelected] = useState(initialColor);
  const [shapeSelected, setShapeSelected] = useState(initialShape);
  const [vase, setVase] = useState("");
  const [etching, setEtching] = useState("");
  const [bronzeEmblem, setBronzeEmblem] = useState("");
  const [porcelainPhoto, setPorcelainPhoto] = useState("");
  const [designName, setDesignName] = useState("");
  const [wording, setWording] = useState("");
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [savedProjectCount, setSavedProjectCount] = useState(0);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [activeAdvancedStep, setActiveAdvancedStep] = useState('type');
  const [activeCoreStep, setActiveCoreStep] = useState('type');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePan, setImagePan] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStartPoint, setDragStartPoint] = useState({ x: 0, y: 0 });
  const modalImageRef = useRef(null);

  const MIN_IMAGE_ZOOM = 1;
  const MAX_IMAGE_ZOOM = 3;
  const IMAGE_ZOOM_STEP = 0.25;

  const selectedAccessories = [vase, etching, bronzeEmblem, porcelainPhoto].filter(Boolean);
  const { requiresColorStep, requiresShapeStep } = getStepRequirements(selection.type, PREVIEW_CATALOG);

  useEffect(() => {
    if (!isImageModalOpen) {
      return undefined;
    }

    const handleEscToClose = (event) => {
      if (event.key === 'Escape') {
        setIsImageModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscToClose);
    return () => {
      document.removeEventListener('keydown', handleEscToClose);
    };
  }, [isImageModalOpen]);

  const formatSelectionLabel = (value) => {
    if (!value) {
      return '';
    }

    return value
      .split('_')
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase())
      .join(' ');
  };

  const getAdditionalCategorySummary = (category) => {
    const selectedValue = selection[category.key];
    const options = ADVANCED_ADDITIONAL_CATEGORY_OPTIONS?.[category.key] || [];
    const selectedOption = options.find((option) => option.value === selectedValue);

    if (selectedOption) {
      return selectedOption.label;
    }

    if (selectedValue) {
      return formatSelectionLabel(selectedValue);
    }

    return options.length ? 'Not selected' : 'Coming soon';
  };

  const advancedSteps = [
    {
      key: 'type',
      label: 'Stone Type',
      description: 'Start by choosing the memorial structure you want to build from.',
      summary: selection.type ? typeSelected : 'Not selected',
      isComplete: Boolean(selection.type),
    },
    ...(requiresColorStep
      ? [{
          key: 'color',
          label: 'Stone Color',
          description: 'Choose the granite or finish color for this memorial concept.',
          summary: selection.color ? colorSelected : 'Not selected',
          isComplete: Boolean(selection.color),
        }]
      : []),
    ...(requiresShapeStep
      ? [{
          key: 'shape',
          label: 'Stone Shape',
          description: 'Refine the silhouette to match the memorial style you want to present.',
          summary: selection.shape ? shapeSelected : 'Not selected',
          isComplete: Boolean(selection.shape),
        }]
      : []),
    ...ADVANCED_ADDITIONAL_CATEGORIES.map((category) => {
      const options = ADVANCED_ADDITIONAL_CATEGORY_OPTIONS?.[category.key] || [];
      const selectedValue = selection[category.key];

      return {
        key: category.key,
        label: category.label,
        description: category.description,
        summary: getAdditionalCategorySummary(category),
        isComplete: options.length ? Boolean(selectedValue) : true,
      };
    }),
    {
      key: 'accessories',
      label: 'Accessories',
      description: 'Add optional memorial details once the main composition is locked in.',
      summary: selectedAccessories.length ? selectedAccessories.join(', ') : 'Optional',
      isComplete: true,
    },
  ];

  const currentAdvancedStep = advancedSteps.find((step) => step.key === activeAdvancedStep) || advancedSteps[0];

  const coreSteps = [
    {
      key: 'type',
      label: 'Stone Type',
      description: 'Start by choosing the memorial structure you want to build from.',
      summary: selection.type ? typeSelected : 'Not selected',
      isComplete: Boolean(selection.type),
    },
    ...(requiresColorStep
      ? [{
          key: 'color',
          label: 'Stone Color',
          description: 'Choose the granite or finish color for this memorial concept.',
          summary: selection.color ? colorSelected : 'Not selected',
          isComplete: Boolean(selection.color),
        }]
      : []),
    ...(requiresShapeStep
      ? [{
          key: 'shape',
          label: 'Stone Shape',
          description: 'Refine the silhouette to match the memorial style you want to present.',
          summary: selection.shape ? shapeSelected : 'Not selected',
          isComplete: Boolean(selection.shape),
        }]
      : []),
    {
      key: 'accessories',
      label: 'Accessories',
      description: 'Add optional memorial details after the base stone decisions are complete.',
      summary: selectedAccessories.length ? selectedAccessories.join(', ') : 'Optional',
      isComplete: true,
    },
  ];

  const currentCoreStep = coreSteps.find((step) => step.key === activeCoreStep) || coreSteps[0];

  const setHiddenInputValue = (id, value) => {
    if (typeof document === 'undefined') {
      return;
    }

    const input = document.getElementById(id);
    if (input) {
      input.value = value;
    }
  };

  const clearAccessorySelections = () => {
    setVase('');
    setEtching('');
    setBronzeEmblem('');
    setPorcelainPhoto('');
    setHiddenInputValue('VaseInput', '');
    setHiddenInputValue('EtchingInput', '');
    setHiddenInputValue('BronzeEmblemInput', '');
    setHiddenInputValue('PorcelainPhotoInput', '');
  };

  const openImageModal = () => {
    setImageZoom(1);
    setImagePan({ x: 0, y: 0 });
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setIsDraggingImage(false);
  };

  const applyImageZoom = (targetZoom, anchorPoint = null) => {
    setImageZoom((currentZoom) => {
      const nextZoom = Math.max(MIN_IMAGE_ZOOM, Math.min(MAX_IMAGE_ZOOM, Number(targetZoom.toFixed(2))));

      if (nextZoom === currentZoom) {
        return currentZoom;
      }

      setImagePan((currentPan) => {
        if (nextZoom === MIN_IMAGE_ZOOM) {
          return { x: 0, y: 0 };
        }

        if (!anchorPoint || !modalImageRef.current) {
          return currentPan;
        }

        const imageRect = modalImageRef.current.getBoundingClientRect();
        const imageCenterX = imageRect.left + imageRect.width / 2;
        const imageCenterY = imageRect.top + imageRect.height / 2;
        const zoomRatio = nextZoom / currentZoom;

        return {
          x: Number((currentPan.x + (1 - zoomRatio) * (anchorPoint.x - imageCenterX)).toFixed(2)),
          y: Number((currentPan.y + (1 - zoomRatio) * (anchorPoint.y - imageCenterY)).toFixed(2)),
        };
      });

      return nextZoom;
    });
  };

  const zoomInImage = () => {
    applyImageZoom(imageZoom + IMAGE_ZOOM_STEP);
  };

  const zoomOutImage = () => {
    applyImageZoom(imageZoom - IMAGE_ZOOM_STEP);
  };

  const resetImageZoom = () => {
    setImageZoom(1);
    setImagePan({ x: 0, y: 0 });
  };

  const handleImageViewportWheel = (event) => {
    event.preventDefault();

    if (event.deltaY < 0) {
      applyImageZoom(imageZoom + IMAGE_ZOOM_STEP, { x: event.clientX, y: event.clientY });
      return;
    }

    applyImageZoom(imageZoom - IMAGE_ZOOM_STEP, { x: event.clientX, y: event.clientY });
  };

  const handleImageMouseDown = (event) => {
    if (imageZoom <= MIN_IMAGE_ZOOM) {
      return;
    }

    event.preventDefault();
    setIsDraggingImage(true);
    setDragStartPoint({
      x: event.clientX - imagePan.x,
      y: event.clientY - imagePan.y,
    });
  };

  const handleImageMouseMove = (event) => {
    if (!isDraggingImage) {
      return;
    }

    setImagePan({
      x: event.clientX - dragStartPoint.x,
      y: event.clientY - dragStartPoint.y,
    });
  };

  const stopImageDragging = () => {
    setIsDraggingImage(false);
  };

  useEffect(() => {
    if (!isDraggingImage) {
      return undefined;
    }

    const handleWindowMouseUp = () => {
      stopImageDragging();
    };

    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDraggingImage]);

  const handleAdvancedTypeSelect = (typeValue, typeLabel) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      type: typeValue,
      color: null,
      shape: null,
      designStyle: DEFAULT_DESIGN_STYLE,
      name: null,
      ...EMPTY_ADVANCED_ADDITIONAL_SELECTIONS,
    }));
    setTypeSelected(typeLabel);
    setColorSelected(initialColor);
    setShapeSelected(initialShape);
    clearAccessorySelections();
  };

  const handleAdvancedColorSelect = (colorValue, colorLabel) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      color: colorValue,
      shape: null,
      designStyle: DEFAULT_DESIGN_STYLE,
      name: null,
      ...EMPTY_ADVANCED_ADDITIONAL_SELECTIONS,
    }));
    setColorSelected(colorLabel);
    setShapeSelected(initialShape);
    clearAccessorySelections();
  };

  const handleAdvancedShapeSelect = (shapeValue, shapeLabel) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      shape: shapeValue,
      designStyle: DEFAULT_DESIGN_STYLE,
      name: null,
      ...EMPTY_ADVANCED_ADDITIONAL_SELECTIONS,
    }));
    setShapeSelected(shapeLabel);
    clearAccessorySelections();
  };

  const handleAdvancedAdditionalCategorySelect = (categoryKey, optionValue) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      [categoryKey]: optionValue,
    }));
  };

  const toggleAdvancedAccessory = (accessoryValue) => {
    const isSelected = selectedAccessories.includes(accessoryValue);
    const nextValue = isSelected ? '' : accessoryValue;

    if (accessoryValue === 'Vase') {
      setVase(nextValue);
      setHiddenInputValue('VaseInput', nextValue);
    }

    if (accessoryValue === 'Etching') {
      setEtching(nextValue);
      setHiddenInputValue('EtchingInput', nextValue);
    }

    if (accessoryValue === 'Bronze Emblem') {
      setBronzeEmblem(nextValue);
      setHiddenInputValue('BronzeEmblemInput', nextValue);
    }

    if (accessoryValue === 'Porcelain Photo') {
      setPorcelainPhoto(nextValue);
      setHiddenInputValue('PorcelainPhotoInput', nextValue);
    }
  };

  const isAdvancedShapeDisabled = (shapeValue) => {
    return isShapeDisabledForType({
      shapeValue,
      typeValue: selection.type,
      catalog: PREVIEW_CATALOG,
    });
  };

  const isAdvancedAccessoryDisabled = (accessoryValue) => {
    return isAccessoryDisabledForSelection({
      accessoryValue,
      selection,
      catalog: PREVIEW_CATALOG,
    });
  };

  useEffect(() => {
    if (!hasAdvancedPreviewerAccess) {
      return;
    }

    const stepStillVisible = advancedSteps.some((step) => step.key === activeAdvancedStep);
    if (!stepStillVisible) {
      setActiveAdvancedStep(advancedSteps[0]?.key || 'type');
    }
  }, [
    hasAdvancedPreviewerAccess,
    activeAdvancedStep,
    advancedSteps,
  ]);

  useEffect(() => {
    if (hasAdvancedPreviewerAccess) {
      return;
    }

    const stepStillVisible = coreSteps.some((step) => step.key === activeCoreStep);
    if (!stepStillVisible) {
      setActiveCoreStep(coreSteps[0]?.key || 'type');
    }
  }, [
    hasAdvancedPreviewerAccess,
    activeCoreStep,
    coreSteps,
  ]);

  useEffect(() => {
    const loadProjectCount = async () => {
      try {
        const projects = await getSavedProjects();
        setSavedProjectCount(projects.length);
      } catch (error) {
        console.error('Failed to load project count:', error);
        setSavedProjectCount(0);
      }
    };
    loadProjectCount();
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);
  
  const handleSaveProject = async () => {
    if (!canSaveProjects({ isAuthenticated, plan, projectCount: savedProjectCount, currentProjectId })) {
      setSaveMessage(getSaveProjectMessage({ isAuthenticated, plan, projectCount: savedProjectCount, currentProjectId }));

      if (!isAuthenticated) {
        navigate('/signup');
      } else {
        navigate('/pricing');
      }

      return;
    }

    if (!designName.trim()) {
      setSaveMessage('Please give this design a name before saving it.');
      return;
    }

    try {
      setSaveMessage('Saving design...');
      const projectTitle = designName.trim()
        ? designName.trim().slice(0, 60)
        : wording.trim()
          ? wording.trim().slice(0, 40)
          : `${typeSelected !== initialType ? typeSelected : 'Custom design'} ΓÇó ${colorSelected !== initialColor ? colorSelected : 'Custom color'} ΓÇó ${shapeSelected !== initialShape ? shapeSelected : 'Custom shape'}`;

      const projectData = {
        title: projectTitle,
        type: selection.type || typeSelected,
        color: selection.color || colorSelected,
        shape: selection.shape || shapeSelected,
        designStyle: selection.designStyle || DEFAULT_DESIGN_STYLE,
        name: selection.name || '',
        wording: wording.trim(),
        accessories: [
          document.getElementById('VaseInput')?.value === 'Vase' ? 'Vase' : null,
          document.getElementById('EtchingInput')?.value === 'Etching' ? 'Etching' : null,
          document.getElementById('BronzeEmblemInput')?.value === 'Bronze Emblem' ? 'Bronze Emblem' : null,
          document.getElementById('PorcelainPhotoInput')?.value === 'Porcelain Photo' ? 'Porcelain Photo' : null,
        ].filter(Boolean),
      };

      let result;
      if (currentProjectId) {
        // Update existing project
        await updateProject(currentProjectId, projectData);
        setSaveMessage('Design updated successfully!');
      } else {
        // Create new project
        const updatedProjects = await saveProject(projectData);
        setSavedProjectCount(updatedProjects.length);
        setSaveMessage('Design saved successfully!');
      }
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage(error.message || 'Failed to save design. Please try again.');
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async () => {
    if (!currentProjectId) {
      return;
    }

    if (window.confirm('Are you sure you want to delete this design? This action cannot be undone.')) {
      try {
        await deleteProject(currentProjectId);
        const projects = await getSavedProjects();
        setSavedProjectCount(projects.length);
        setCurrentProjectId(null);
        resetSelections();
        setSaveMessage('Design deleted successfully.');
        setTimeout(() => setSaveMessage(''), 3000);
      } catch (error) {
        setSaveMessage('Failed to delete design. Please try again.');
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleRenameProject = async () => {
    if (!currentProjectId || !designName.trim()) {
      return;
    }

    try {
      await updateProject(currentProjectId, { title: designName.trim() });
      setSaveMessage('Design renamed successfully.');
      setIsEditingName(false);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to rename design. Please try again.');
      console.error('Error renaming project:', error);
    }
  };

  const getSelectedAccessoryValues = () => {
    return [
      document.getElementById('VaseInput')?.value === 'Vase' ? 'Vase' : null,
      document.getElementById('EtchingInput')?.value === 'Etching' ? 'Etching' : null,
      document.getElementById('BronzeEmblemInput')?.value === 'Bronze Emblem' ? 'Bronze Emblem' : null,
      document.getElementById('PorcelainPhotoInput')?.value === 'Porcelain Photo' ? 'Porcelain Photo' : null,
    ].filter(Boolean);
  };

  const handleRequestQuote = () => {
    const additionalCategorySelections = ADVANCED_ADDITIONAL_CATEGORY_KEYS.reduce((accumulator, categoryKey) => {
      accumulator[categoryKey] = selection[categoryKey] || null;
      return accumulator;
    }, {});

    const quoteRequestDraft = {
      title: designName.trim() || 'Untitled memorial design',
      type: selection.type || null,
      color: selection.color || null,
      shape: selection.shape || null,
      designStyle: selection.designStyle || DEFAULT_DESIGN_STYLE,
      wording: wording.trim(),
      accessories: getSelectedAccessoryValues(),
      additionalCategorySelections,
    };

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('headstone-previewer-quote-request', JSON.stringify(quoteRequestDraft));
    }

    navigate('/quote-request', {
      state: {
        quoteRequestDraft,
      },
    });
  };

  const applyLoadedProject = (project) => {
    if (!project) {
      return;
    }

    setCurrentProjectId(project.id);

    const nextSelection = {
      type: project.type || null,
      color: project.color || null,
      shape: project.shape || null,
      designStyle: project.designStyle || DEFAULT_DESIGN_STYLE,
      name: project.name || null,
      ...EMPTY_ADVANCED_ADDITIONAL_SELECTIONS,
    };

    setSelection(nextSelection);
    setTypeSelected(project.type ? formatSelectionLabel(project.type) : initialType);
    setColorSelected(project.color ? formatSelectionLabel(project.color) : initialColor);
    setShapeSelected(project.shape ? formatSelectionLabel(project.shape) : initialShape);
    setDesignName(project.title || '');
    setWording(project.wording || '');
    setVase(project.accessories?.includes('Vase') ? 'Vase' : '');
    setEtching(project.accessories?.includes('Etching') ? 'Etching' : '');
    setBronzeEmblem(project.accessories?.includes('Bronze Emblem') ? 'Bronze Emblem' : '');
    setPorcelainPhoto(project.accessories?.includes('Porcelain Photo') ? 'Porcelain Photo' : '');
    setActiveAdvancedStep('accessories');
    setActiveCoreStep('accessories');

    document.getElementById('VaseInput').value = project.accessories?.includes('Vase') ? 'Vase' : '';
    document.getElementById('EtchingInput').value = project.accessories?.includes('Etching') ? 'Etching' : '';
    document.getElementById('BronzeEmblemInput').value = project.accessories?.includes('Bronze Emblem') ? 'Bronze Emblem' : '';
    document.getElementById('PorcelainPhotoInput').value = project.accessories?.includes('Porcelain Photo') ? 'Porcelain Photo' : '';

    document.querySelectorAll('.TypeSelected, .ColorSelected, .ShapeSelected, .AccessorySelected').forEach((element) => element.classList.remove('TypeSelected', 'ColorSelected', 'ShapeSelected', 'AccessorySelected'));

    if (project.type) {
      document.getElementById(project.type)?.classList.add('TypeSelected');
    }

    if (project.color) {
      document.getElementById(project.color)?.classList.add('ColorSelected');
    }

    if (project.shape) {
      document.getElementById(project.shape)?.classList.add('ShapeSelected');
    }

    document.querySelectorAll('.AccessoryOption').forEach((button) => {
      const isSelected = project.accessories?.includes(button.textContent?.trim());
      button.classList.toggle('AccessorySelected', Boolean(isSelected));
    });

    document.getElementById('NoCombinationMessage')?.classList.add('hidden');
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const pendingProject = window.sessionStorage.getItem('headstone-previewer-pending-project');

    if (!pendingProject) {
      return;
    }

    try {
      const parsedProject = JSON.parse(pendingProject);
      applyLoadedProject(parsedProject);
      window.sessionStorage.removeItem('headstone-previewer-pending-project');
    } catch (error) {
      console.warn('Unable to load saved project', error);
    }
  }, []);

  const renderAdvancedStepOptions = () => {
    if (currentAdvancedStep.key === 'type') {
      return ADVANCED_TYPE_OPTIONS.map((typeOption) => (
        <button
          key={typeOption.value}
          type='button'
          className={`AdvancedOptionButton${selection.type === typeOption.value ? ' selected' : ''}`}
          onClick={() => handleAdvancedTypeSelect(typeOption.value, typeOption.label)}
        >
          <strong>{typeOption.label}</strong>
          <span>Start your memorial layout from this base structure.</span>
        </button>
      ));
    }

    if (currentAdvancedStep.key === 'color') {
      return ADVANCED_COLOR_OPTIONS.map((colorOption) => (
        <button
          key={colorOption.value}
          type='button'
          className={`AdvancedOptionButton${selection.color === colorOption.value ? ' selected' : ''}`}
          onClick={() => handleAdvancedColorSelect(colorOption.value, colorOption.label)}
        >
          <strong>{colorOption.label}</strong>
          <span>Apply this stone color to the memorial presentation.</span>
        </button>
      ));
    }

    if (currentAdvancedStep.key === 'shape') {
      return ADVANCED_SHAPE_OPTIONS.map((shapeOption) => {
        const disabled = isAdvancedShapeDisabled(shapeOption.value);

        return (
          <button
            key={shapeOption.value}
            type='button'
            className={`AdvancedOptionButton${selection.shape === shapeOption.value ? ' selected' : ''}`}
            onClick={() => handleAdvancedShapeSelect(shapeOption.value, shapeOption.label)}
            disabled={disabled}
          >
            <strong>{shapeOption.label}</strong>
            <span>{disabled ? 'This shape is not available for the current stone type.' : 'Use this silhouette to shape the memorial concept.'}</span>
          </button>
        );
      });
    }

    const matchingAdditionalCategory = ADVANCED_ADDITIONAL_CATEGORIES.find((category) => category.key === currentAdvancedStep.key);

    if (matchingAdditionalCategory) {
      const categoryOptions = ADVANCED_ADDITIONAL_CATEGORY_OPTIONS?.[matchingAdditionalCategory.key] || [];

      if (!categoryOptions.length) {
        return (
          <article className='AdvancedOptionButton selected' role='note' aria-live='polite'>
            <strong>{matchingAdditionalCategory.label} options coming soon</strong>
            <span>This category is now part of the Advanced Previewer workflow. We can add options next in small batches.</span>
          </article>
        );
      }

      return categoryOptions.map((categoryOption) => (
        <button
          key={categoryOption.value}
          type='button'
          className={`AdvancedOptionButton${selection[matchingAdditionalCategory.key] === categoryOption.value ? ' selected' : ''}`}
          onClick={() => handleAdvancedAdditionalCategorySelect(matchingAdditionalCategory.key, categoryOption.value)}
        >
          <strong>{categoryOption.label}</strong>
          <span>{categoryOption.description || `Set ${matchingAdditionalCategory.label.toLowerCase()} for this memorial concept.`}</span>
        </button>
      ));
    }

    return ADVANCED_ACCESSORY_OPTIONS.map((accessoryOption) => {
      const disabled = isAdvancedAccessoryDisabled(accessoryOption.value);
      const selected = selectedAccessories.includes(accessoryOption.value);

      return (
        <button
          key={accessoryOption.value}
          type='button'
          className={`AdvancedOptionButton${selected ? ' selected' : ''}`}
          onClick={() => toggleAdvancedAccessory(accessoryOption.value)}
          disabled={disabled}
        >
          <strong>{accessoryOption.label}</strong>
          <span>{disabled ? 'This accessory is not available for the current memorial configuration.' : selected ? 'Currently included in this memorial concept.' : 'Optional add-on for this concept.'}</span>
        </button>
      );
    });
  };

  const renderCoreStepOptions = () => {
    if (currentCoreStep.key === 'type') {
      return ADVANCED_TYPE_OPTIONS.map((typeOption) => (
        <button
          key={typeOption.value}
          type='button'
          className={`AdvancedOptionButton${selection.type === typeOption.value ? ' selected' : ''}`}
          onClick={() => handleAdvancedTypeSelect(typeOption.value, typeOption.label)}
        >
          <strong>{typeOption.label}</strong>
          <span>Choose the primary stone structure for this memorial concept.</span>
        </button>
      ));
    }

    if (currentCoreStep.key === 'color') {
      return ADVANCED_COLOR_OPTIONS.map((colorOption) => (
        <button
          key={colorOption.value}
          type='button'
          className={`AdvancedOptionButton${selection.color === colorOption.value ? ' selected' : ''}`}
          onClick={() => handleAdvancedColorSelect(colorOption.value, colorOption.label)}
        >
          <strong>{colorOption.label}</strong>
          <span>Apply this finish to the current memorial structure.</span>
        </button>
      ));
    }

    if (currentCoreStep.key === 'shape') {
      return ADVANCED_SHAPE_OPTIONS.map((shapeOption) => {
        const disabled = isAdvancedShapeDisabled(shapeOption.value);

        return (
          <button
            key={shapeOption.value}
            type='button'
            className={`AdvancedOptionButton${selection.shape === shapeOption.value ? ' selected' : ''}`}
            onClick={() => handleAdvancedShapeSelect(shapeOption.value, shapeOption.label)}
            disabled={disabled}
          >
            <strong>{shapeOption.label}</strong>
            <span>{disabled ? 'This shape is not available for the current stone type.' : 'Finalize the silhouette for your core preview.'}</span>
          </button>
        );
      });
    }

    return ADVANCED_ACCESSORY_OPTIONS.map((accessoryOption) => {
      const disabled = isAdvancedAccessoryDisabled(accessoryOption.value);
      const selected = selectedAccessories.includes(accessoryOption.value);

      return (
        <button
          key={accessoryOption.value}
          type='button'
          className={`AdvancedOptionButton${selected ? ' selected' : ''}`}
          onClick={() => toggleAdvancedAccessory(accessoryOption.value)}
          disabled={disabled}
        >
          <strong>{accessoryOption.label}</strong>
          <span>{disabled ? 'This accessory is not available for the current memorial configuration.' : selected ? 'Currently included in this memorial concept.' : 'Optional add-on for this concept.'}</span>
        </button>
      );
    });
  };

  let SelectionImage = '';
  const previewImageSrc = imageSrc(selection);
  return (
    
    <>
      <Modal isOpen={showHowItWorksModal} onClose={() => setShowHowItWorksModal(false)} />
      
      <div className="previewer-container">
        <div className='PreviewerActions'> 
          <div className='DesignNameSaveGroup'>
            <label htmlFor='designNameInput' className='DesignNameLabel'>Design Name</label>
            <div className='DesignNameInputWrapper'>
              <input
                id='designNameInput'
                type='text'
                className={`DesignNameInput ${isEditingName ? 'editing' : ''}`}
                value={designName}
                onChange={(event) => setDesignName(event.target.value)}
                placeholder='Name this memorial design'
                disabled={!isEditingName && currentProjectId}
              />
              {currentProjectId && (
                <button 
                  className='EditNameButton' 
                  type='button' 
                  onClick={() => {
                    if (isEditingName) {
                      handleRenameProject();
                    } else {
                      setIsEditingName(true);
                    }
                  }}
                >
                  {isEditingName ? 'Save' : 'Edit'}
                </button>
              )}
            </div>
            <div className='DesignActionButtons'>
              <button className='SaveButton' type='button' onClick={handleSaveProject}>Save Design</button>
              {currentProjectId && <button className='DeleteButton' type='button' onClick={handleDeleteProject}>Delete Design</button>}
              <button className='QuoteRequestButton' type='button' onClick={handleRequestQuote}>Request Quote</button>
            </div>
          </div>
          <p className='SavedProjectCount'>{savedProjectCount} saved project{savedProjectCount === 1 ? '' : 's'}</p>
          {saveMessage ? <p className='SaveMessage'>{saveMessage}</p> : null}
          <p className='AdvancedPreviewMessage'>{hasAdvancedPreviewerAccess ? 'Advanced preview mode unlocked. Use the extended category workflow to shape each memorial concept in more detail.' : getAdvancedPreviewerMessage({ isAuthenticated, plan })}</p>
          <button className='ResetButton MobileReset' id='MobileResetButton' type='button' onClick={resetSelections}>Reset Selection</button>
        </div>
        {hasAdvancedPreviewerAccess ? (
          <div className='AdvancedPreviewWizard'>
            <aside className='AdvancedPreviewSummary'>
              <div>
                <p className='AdvancedPreviewLabel'>Advanced Previewer</p>
                <h2>Selections</h2>
                <p className='AdvancedPreviewDescription'>The left panel tracks each decision. The right panel always advances you to the next category.</p>
              </div>
              <div className='AdvancedPreviewStepList'>
                {advancedSteps.map((step, index) => (
                  <button
                    key={step.key}
                    type='button'
                    className={`AdvancedStepCard${step.key === currentAdvancedStep.key ? ' active' : ''}${step.isComplete ? ' complete' : ''}`}
                    onClick={() => setActiveAdvancedStep(step.key)}
                  >
                    <span className='AdvancedStepIndex'>0{index + 1}</span>
                    <span className='AdvancedStepText'>
                      <strong>{step.label}</strong>
                      <em>{step.summary}</em>
                    </span>
                  </button>
                ))}
              </div>
              <button className='ResetButton AdvancedResetButton' type='button' onClick={resetSelections}>Reset Selection</button>
            </aside>
            <section className='AdvancedPreviewPanel'>
              <div className='AdvancedPreviewPanelHeader'>
                <p className='AdvancedPreviewLabel'>Step {advancedSteps.findIndex((step) => step.key === currentAdvancedStep.key) + 1} of {advancedSteps.length}</p>
                <h3>{currentAdvancedStep.label}</h3>
                <p>{currentAdvancedStep.description}</p>
              </div>
              <div className='AdvancedOptionGrid'>
                {renderAdvancedStepOptions()}
              </div>
            </section>
          </div>
        ) : (
          <div className='AdvancedPreviewWizard CorePreviewWizard'>
            <aside className='AdvancedPreviewSummary'>
              <div>
                <p className='AdvancedPreviewLabel'>Core Previewer</p>
                <h2>Selections</h2>
                <p className='AdvancedPreviewDescription'>Core plans follow the same guided wizard pattern with a streamlined category set.</p>
              </div>
              <div className='AdvancedPreviewStepList'>
                {coreSteps.map((step, index) => (
                  <button
                    key={step.key}
                    type='button'
                    className={`AdvancedStepCard${step.key === currentCoreStep.key ? ' active' : ''}${step.isComplete ? ' complete' : ''}`}
                    onClick={() => setActiveCoreStep(step.key)}
                  >
                    <span className='AdvancedStepIndex'>0{index + 1}</span>
                    <span className='AdvancedStepText'>
                      <strong>{step.label}</strong>
                      <em>{step.summary}</em>
                    </span>
                  </button>
                ))}
              </div>
              <button className='ResetButton AdvancedResetButton' type='button' onClick={resetSelections}>Reset Selection</button>
            </aside>
            <section className='AdvancedPreviewPanel'>
              <div className='AdvancedPreviewPanelHeader'>
                <p className='AdvancedPreviewLabel'>Step {coreSteps.findIndex((step) => step.key === currentCoreStep.key) + 1} of {coreSteps.length}</p>
                <h3>{currentCoreStep.label}</h3>
                <p>{currentCoreStep.description}</p>
              </div>
              <div className='AdvancedOptionGrid'>
                {renderCoreStepOptions()}
              </div>
            </section>
          </div>
        )}

        <div className='LegacyStateShim' aria-hidden='true'>
          <div id='ColorOptionsList' className='ColorOptionsList' />
          <div id='ShapeOptionsList' className='ShapeOptionsList' />
          <div id='AccessoriesOptionsList' className='AccessoriesOptionsList' />
        </div>

        <div className='Preview-Images'>
          <div className='Preview-Container'>
            <div className='PreviewStyleBadge'>{hasAdvancedPreviewerAccess ? 'Advanced Previewer' : 'Core Previewer'}</div>
            <button
              type='button'
              className='PreviewImageButton'
              onClick={openImageModal}
              aria-label='Open preview image in zoomable modal'
            >
              <img className='Image' id='Stone' src={previewImageSrc} alt='Selected headstone preview' />
            </button>
          </div>
          <p id='NoCombinationMessage'  className='NoCombinationMessage hidden'>This combination has not been made yet. But if you'd like to see it, please let us know!</p>
          <div className='PreviewStyleCard'>
            <h3>{hasAdvancedPreviewerAccess ? 'Advanced category workflow' : 'Simple preview flow'}</h3>
            <p>{hasAdvancedPreviewerAccess ? 'Advanced mode now includes an expanded category sequence so we can keep layering in options category-by-category.' : 'Core plans keep a streamlined guided flow across stone type, color/shape, and accessories.'}</p>
          </div>
        </div>

        <div className='PreviewHiddenFields' aria-hidden='true'>
          <input type='text' name='Image' id='ImageInput' value={SelectionImage} hidden readOnly />
          <input type='text' name='Type' id='TypeInput' value={typeSelected} hidden readOnly />
          <input type='text' name='Shape' id='ShapeInput' value={shapeSelected} hidden readOnly />
          <input type='text' name='Color' id='ColorInput' value={colorSelected} hidden readOnly />
          <input type='text' name='Design Style' id='DesignStyleInput' value={DEFAULT_DESIGN_STYLE} hidden readOnly />
          <input type='text' id='VaseInput' name='Would You Like a Vase?' hidden readOnly />
          <input type='text' id='EtchingInput' name='Would You Like an Etching?' hidden readOnly />
          <input type='text' id='BronzeEmblemInput' name='Would You Like a Bronze Emblem?' hidden readOnly />
          <input type='text' id='PorcelainPhotoInput' name='Would You Like a Porcelain Photo?' hidden readOnly />
        </div>
        
      </div>

      {isImageModalOpen && (
        <div className='PreviewImageModalOverlay' onClick={closeImageModal}>
          <div className='PreviewImageModalContent' onClick={(event) => event.stopPropagation()}>
            <button type='button' className='PreviewImageModalCloseButton' onClick={closeImageModal} aria-label='Close image modal'>
              x
            </button>
            <div className='PreviewImageModalToolbar'>
              <button type='button' onClick={zoomOutImage} disabled={imageZoom <= MIN_IMAGE_ZOOM}>-</button>
              <span>{Math.round(imageZoom * 100)}%</span>
              <button type='button' onClick={zoomInImage} disabled={imageZoom >= MAX_IMAGE_ZOOM}>+</button>
              <button type='button' onClick={resetImageZoom}>Reset</button>
            </div>
            <div
              className={`PreviewImageModalViewport${imageZoom > MIN_IMAGE_ZOOM ? ' is-draggable' : ''}${isDraggingImage ? ' is-dragging' : ''}`}
              onWheel={handleImageViewportWheel}
              onMouseDown={handleImageMouseDown}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={stopImageDragging}
              onMouseUp={stopImageDragging}
            >
              <img
                ref={modalImageRef}
                className='PreviewImageModalImage'
                src={previewImageSrc}
                alt='Selected headstone preview enlarged'
                onDragStart={(event) => event.preventDefault()}
                style={{ transform: `translate(${imagePan.x}px, ${imagePan.y}px) scale(${imageZoom})` }}
              />
            </div>
          </div>
        </div>
      )}

      
    </>
    
  );
  
}


export default Previewer;

