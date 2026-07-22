import React from 'react';
import {FaAngleDown} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Previewer.css';
import Modal from '../Modal/Modal';
import { saveProject, getSavedProjects, deleteProject, updateProject } from '../../utils/savedProjects';
import { useAuth } from '../../context/AuthContext';
import { canSaveProjects, canUseAdvancedPreviewer, getAdvancedPreviewerMessage, getSaveProjectMessage } from '../../utils/accessRules';
import { DEFAULT_DESIGN_STYLE, DESIGN_STYLE_OPTIONS, getDesignStyleDetails, formatDesignStyleLabel } from '../../utils/designStyles';
import Logo from '../../assets/CJStonesLogo.jpg';
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
import Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Apex_Top from '../../assets/Thorsen back.jpeg';
import Roof_Top from '../../assets/Camacho.jpeg';

import Die_And_Base from '../../assets/Casillas 2.jpg';
import Impala_Black_Die_And_Base from '../../assets/Casillas 2.jpg';
import Impala_Black_Die_And_Base_Heart_Shape from '../../assets/Martinez heart.jpg';
import Impala_Black_Die_And_Base_Angel_Carved from '../../assets/Weitsma 1.jpg';
import Impala_Black_Die_And_Base_Flat_Top from '../../assets/Weldon.JPG';
import Impala_Black_Die_And_Base_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Die_And_Base_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Barre_Grey_Die_And_Base from '../../assets/Coakley.jpeg';
import Barre_Grey_Die_And_Base_Heart_Shape from '../../assets/Gabrielli3.jpg';
import Barre_Grey_Die_And_Base_Angel_Carved from '../../assets/Rende.jpg';
import Barre_Grey_Die_And_Base_Flat_Top from '../../assets/Shappe.JPG';
import Barre_Grey_Die_And_Base_Serpentine_Top from '../../assets/Coakley.jpeg';
import Barre_Grey_Die_And_Base_Oval_Top from '../../assets/Smith.jpg';
import Barre_Grey_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Barre_Grey_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Barre_Grey_Die_And_Base_Apex_Top from '../../assets/Thorsen back.jpeg';
import Barre_Grey_Die_And_Base_Roof_Top from '../../assets/Camacho.jpeg';

import North_American_Pink_Die_And_Base from '../../assets/Conforti.jpeg';
import North_American_Pink_Die_And_Base_Heart_Shape from '../../assets/Cinelli.jpg';
import North_American_Pink_Die_And_Base_Angel_Carved from '../../assets/Angel Heart 2.jpg';
import North_American_Pink_Die_And_Base_Flat_Top from '../../assets/Finnigan.jpg';
import North_American_Pink_Die_And_Base_Serpentine_Top from '../../assets/Conforti.jpeg';
import North_American_Pink_Die_And_Base_Oval_Top from '../../assets/Zmudzinski.jpg';
import North_American_Pink_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Mahogany_Die_And_Base from '../../assets/Ferdinand V.jpeg';
import Mahogany_Die_And_Base_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Mahogany_Die_And_Base_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Mahogany_Die_And_Base_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Die_And_Base_Serpentine_Top from '../../assets/Ferdinand V.jpeg';
import Mahogany_Die_And_Base_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Cats_Eye_Die_And_Base from '../../assets/Stockhamer.jpeg';
import Cats_Eye_Die_And_Base_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Die_And_Base_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Die_And_Base_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Die_And_Base_Serpentine_Top from '../../assets/Stockhamer.jpeg';
import Cats_Eye_Die_And_Base_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Evergreen_Die_And_Base from '../../assets/Seredynski.jpeg';
import Evergreen_Die_And_Base_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Evergreen_Die_And_Base_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Evergreen_Die_And_Base_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Die_And_Base_Serpentine_Top from '../../assets/Seredynski.jpeg';
import Evergreen_Die_And_Base_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Jet_Black_Die_And_Base from '../../assets/Rivera.jpg';
import Jet_Black_Die_And_Base_Heart_Shape from '../../assets/Mason.jpg';
import Jet_Black_Die_And_Base_Angel_Carved from '../../assets/Weitsma 1.jpg';
import Jet_Black_Die_And_Base_Flat_Top from '../../assets/Weldon.JPG';
import Jet_Black_Die_And_Base_Serpentine_Top from '../../assets/Rivera.jpg';
import Jet_Black_Die_And_Base_Oval_Top from '../../assets/Milkovich.jpeg';
import Jet_Black_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Blue_Pearl_Die_And_Base from '../../assets/Anderson.JPG';
import Blue_Pearl_Die_And_Base_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Die_And_Base_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Die_And_Base_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Die_And_Base_Serpentine_Top from '../../assets/Anderson.JPG';
import Blue_Pearl_Die_And_Base_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Tropical_Green_Die_And_Base from '../../assets/Meier.jpeg';
import Tropical_Green_Die_And_Base_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Die_And_Base_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Die_And_Base_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Die_And_Base_Serpentine_Top from '../../assets/Meier.jpeg';
import Tropical_Green_Die_And_Base_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Paradiso_Die_And_Base from '../../assets/Krieger.jpg';
import Paradiso_Die_And_Base_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Paradiso_Die_And_Base_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Paradiso_Die_And_Base_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Die_And_Base_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Die_And_Base_Oval_Top from '../../assets/Krieger.jpg';
import Paradiso_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Bahama_Blue_Die_And_Base from '../../assets/Giglio.jpg';
import Bahama_Blue_Die_And_Base_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Die_And_Base_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Die_And_Base_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Die_And_Base_Serpentine_Top from '../../assets/Giglio.jpg';
import Bahama_Blue_Die_And_Base_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Die_And_Base_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Die_And_Base_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Die_And_Base_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Die_And_Base_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Monolith from '../../assets/Wood.jpg';
import Impala_Black_Monolith from '../../assets/Wood.jpg';
import Impala_Black_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Monolith_Angel_Carved from '../../assets/Casillas 2.jpg';
import Impala_Black_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Monolith_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Monolith_Oval_Top from '../../assets/Wood.jpg';
import Impala_Black_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Barre_Grey_Monolith from '../../assets/Walker.jpg';
import Barre_Grey_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Barre_Grey_Monolith_Angel_Carved from '../../assets/Casillas 2.jpg';
import Barre_Grey_Monolith_Flat_Top from '../../assets/Ettere.jpg';
import Barre_Grey_Monolith_Serpentine_Top from '../../assets/Strandberg.jpg';
import Barre_Grey_Monolith_Oval_Top from '../../assets/Fornerod.jpg';
import Barre_Grey_Monolith_Half_Serpentine_Top from '../../assets/Walker.jpg';
import Barre_Grey_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Barre_Grey_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Barre_Grey_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import North_American_Pink_Monolith from '../../assets/Maynes.jpeg';
import North_American_Pink_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Monolith_Angel_Carved from '../../assets/Casillas 2.jpg';
import North_American_Pink_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Monolith_Serpentine_Top from '../../assets/Maynes.jpeg';
import North_American_Pink_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Mahogany_Monolith from '../../assets/Castellano.JPG';
import Mahogany_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Mahogany_Monolith_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Mahogany_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Monolith_Serpentine_Top from '../../assets/Castellano.JPG';
import Mahogany_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Cats_Eye_Monolith from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Evergreen_Monolith from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Jet_Black_Monolith from '../../assets/Delorier.jpeg';
import Jet_Black_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Monolith_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Monolith_Flat_Top from '../../assets/Bruckenthal.webp';
import Jet_Black_Monolith_Serpentine_Top from '../../assets/Delorier.jpeg';
import Jet_Black_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Blue_Pearl_Monolith from '../../assets/Taskovich.jpg';
import Blue_Pearl_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Monolith_Angel_Carved from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Monolith_Serpentine_Top from '../../assets/Taskovich.jpg';
import Blue_Pearl_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Tropical_Green_Monolith from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Paradiso_Monolith from '../../assets/Reiter.jpg';
import Paradiso_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Paradiso_Monolith_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Paradiso_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Monolith_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Monolith_Oval_Top from '../../assets/Reiter.jpg';
import Paradiso_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Bahama_Blue_Monolith from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Heart_Shape from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Angel_Carved from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Half_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Half_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Apex_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Monolith_Roof_Top from '../../assets/CJStonesLogo.jpg';

import Slant_Marker from '../../assets/Brunetto.jpg';
import Impala_Black_Slant_Marker from '../../assets/Orellana.jpg';

import Impala_Black_Slant_Marker_Flat_Top from '../../assets/Pharr.jpg';
import Impala_Black_Slant_Marker_Serpentine_Top from '../../assets/Orellana.jpg';
import Impala_Black_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Barre_Grey_Slant_Marker from '../../assets/Brunetto.jpg';

import Barre_Grey_Slant_Marker_Flat_Top from '../../assets/Robinson.jpg';
import Barre_Grey_Slant_Marker_Serpentine_Top from '../../assets/Brunetto.jpg';
import Barre_Grey_Slant_Marker_Oval_Top from '../../assets/Kimbark.JPG';


import North_American_Pink_Slant_Marker from '../../assets/Fitzpatrick.JPG';

import North_American_Pink_Slant_Marker_Flat_Top from '../../assets/Fitzpatrick.JPG';
import North_American_Pink_Slant_Marker_Serpentine_Top from '../../assets/Duah.jpg';
import North_American_Pink_Slant_Marker_Oval_Top from '../../assets/Brockway front set.jpg';


import Mahogany_Slant_Marker from '../../assets/Watson.webp';

import Mahogany_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Slant_Marker_Serpentine_Top from '../../assets/Watson.webp';
import Mahogany_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Cats_Eye_Slant_Marker from '../../assets/CJStonesLogo.jpg';

import Cats_Eye_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Evergreen_Slant_Marker from '../../assets/CJStonesLogo.jpg';

import Evergreen_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Jet_Black_Slant_Marker from '../../assets/Sheehy.JPG';

import Jet_Black_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Slant_Marker_Serpentine_Top from '../../assets/Sheehy.JPG';
import Jet_Black_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Blue_Pearl_Slant_Marker from '../../assets/Hernandez R.jpg';

import Blue_Pearl_Slant_Marker_Flat_Top from '../../assets/Hernandez R.jpg';
import Blue_Pearl_Slant_Marker_Serpentine_Top from '../../assets/DOnofrio.jpg';
import Blue_Pearl_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Tropical_Green_Slant_Marker from '../../assets/CJStonesLogo.jpg';

import Tropical_Green_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Paradiso_Slant_Marker from '../../assets/CJStonesLogo.jpg';

import Paradiso_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Bahama_Blue_Slant_Marker from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';


import Flush_Marker from '../../assets/Moore, Florence.JPG';
import Impala_Black_Flush_Marker from '../../assets/White.jpg';


import Barre_Grey_Flush_Marker from '../../assets/Moore, Florence.JPG';


import North_American_Pink_Flush_Marker from '../../assets/Trotman.jpg';


import Mahogany_Flush_Marker from '../../assets/CJStonesLogo.jpg';


import Cats_Eye_Flush_Marker from '../../assets/CJStonesLogo.jpg';


import Evergreen_Flush_Marker from '../../assets/Wu.jpeg';


import Jet_Black_Flush_Marker from '../../assets/DeMeo.jpg';


import Blue_Pearl_Flush_Marker from '../../assets/CJStonesLogo.jpg';


import Tropical_Green_Flush_Marker from '../../assets/CJStonesLogo.jpg';


import Paradiso_Flush_Marker from '../../assets/CJStonesLogo.jpg';

import Bahama_Blue_Flush_Marker from '../../assets/CJStonesLogo.jpg';


import Hickey_Marker from '../../assets/Meek installed.jpg';
import Impala_Black_Hickey_Marker from '../../assets/CJStonesLogo.jpg';


import Barre_Grey_Hickey_Marker from '../../assets/Meek installed.jpg';


import North_American_Pink_Hickey_Marker from '../../assets/Urban.JPG';


import Mahogany_Hickey_Marker from '../../assets/CJStonesLogo.jpg';


import Cats_Eye_Hickey_Marker from '../../assets/CJStonesLogo.jpg';


import Evergreen_Hickey_Marker from '../../assets/CJStonesLogo.jpg';


import Jet_Black_Hickey_Marker from '../../assets/CJStonesLogo.jpg';


import Blue_Pearl_Hickey_Marker from '../../assets/Yessian.jpg';


import Tropical_Green_Hickey_Marker from '../../assets/CJStonesLogo.jpg';

import Paradiso_Hickey_Marker from '../../assets/CJStonesLogo.jpg';

import Bahama_Blue_Hickey_Marker from '../../assets/CJStonesLogo.jpg';


import Natural_Stone from '../../assets/Lum.jpeg';
import Bench from '../../assets/Barker 1.JPG';
import Impala_Black_Bench from '../../assets/Capalbo installed.jpg';
import Barre_Grey_Bench from '../../assets/Reynolds.JPG';
import North_American_Pink_Bench from '../../assets/Gagliari.JPG';
import Mahogany_Bench from '../../assets/Schiavone Bench.jpg';
import Cats_Eye_Bench from '../../assets/CJStonesLogo.jpg';
import Evergreen_Bench from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Bench from '../../assets/Mayer bench 2.JPG';
import Blue_Pearl_Bench from '../../assets/Giordano 1.jpg';
import Tropical_Green_Bench from '../../assets/CJStonesLogo.jpg';
import Paradiso_Bench from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Bench from '../../assets/CJStonesLogo.jpg';
import Bronze_Plaque from '../../assets/George.JPG';

import Impala_Black_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import Barre_Grey_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import North_American_Pink_Bronze_Plaque from '../../assets/George.JPG';
import Mahogany_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import Evergreen_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import Paradiso_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Bronze_Plaque from '../../assets/CJStonesLogo.jpg';

const COLOR_REQUIRED_TYPES = ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque'];

const ADVANCED_TYPE_OPTIONS = [
  { value: 'Die_And_Base', label: 'Die and Base' },
  { value: 'Monolith', label: 'Monolith' },
  { value: 'Slant_Marker', label: 'Slant Marker' },
  { value: 'Flush_Marker', label: 'Flush Marker' },
  { value: 'Hickey_Marker', label: 'Hickey Marker' },
  { value: 'Natural_Stone', label: 'Natural Stone' },
  { value: 'Bench', label: 'Bench' },
  { value: 'Bronze_Plaque', label: 'Bronze Plaque' },
];

const ADVANCED_COLOR_OPTIONS = [
  { value: 'Impala_Black', label: 'Impala Black' },
  { value: 'Barre_Grey', label: 'Barre Grey' },
  { value: 'North_American_Pink', label: 'North American Pink' },
  { value: 'Mahogany', label: 'Mahogany' },
  { value: 'Cats_Eye', label: 'Cats Eye Brown' },
  { value: 'Evergreen', label: 'Evergreen' },
  { value: 'Jet_Black', label: 'Jet Black' },
  { value: 'Blue_Pearl', label: 'Blue Pearl' },
  { value: 'Tropical_Green', label: 'Tropical Green' },
  { value: 'Paradiso', label: 'Paradiso' },
  { value: 'Bahama_Blue', label: 'Bahama Blue' },
];

const ADVANCED_SHAPE_OPTIONS = [
  { value: 'Heart_Shape', label: 'Heart Shape' },
  { value: 'Angel_Carved', label: 'Angel Carved' },
  { value: 'Flat_Top', label: 'Flat Top' },
  { value: 'Serpentine_Top', label: 'Serpentine Top' },
  { value: 'Oval_Top', label: 'Oval Top' },
  { value: 'Half_Serpentine_Top', label: 'Half Serpentine Top' },
  { value: 'Half_Oval_Top', label: 'Half Oval Top' },
  { value: 'Apex_Top', label: 'Apex Top' },
  { value: 'Roof_Top', label: 'Roof Top' },
];

const ADVANCED_ACCESSORY_OPTIONS = [
  { value: 'Vase', label: 'Vase' },
  { value: 'Etching', label: 'Etching' },
  { value: 'Bronze Emblem', label: 'Bronze Emblem' },
  { value: 'Porcelain Photo', label: 'Porcelain Photo' },
];



const Previewer = () => {

  



  function resetSelections() {
    setSelection(initialSelection);
    setTypeSelected(initialType);
    setColorSelected(initialColor);
    setShapeSelected(initialShape);
    setDesignStyleSelected(initialDesignStyle);
    setActiveAdvancedStep('type');
    clearAccessorySelections();
    
    document.getElementById('ColorOptionsList').classList.remove('active'), 1500;
    document.getElementById('ShapeOptionsList').classList.remove('active'), 1500;
    document.getElementById('StyleOptionsList')?.classList.remove('active'), 1500;
    document.getElementById('AccessoriesOptionsList').classList.remove('active'), 1500;
    
    document.querySelectorAll('.AccessorySelected, .TypeSelected, .ColorSelected, .ShapeSelected, .StyleSelected').forEach(element => element.classList.remove('AccessorySelected', 'TypeSelected', 'ColorSelected', 'ShapeSelected', 'StyleSelected'));
    document.getElementById('NoCombinationMessage').classList.add('hidden');
    if (window.innerWidth < 915) {
      document.querySelectorAll('.TypeOptionsList ul, .ColorOptionsList ul, .ShapeOptionsList ul, .StyleOptionsList ul, .TypeOptionsList p, .ColorOptionsList p, .ShapeOptionsList p, .StyleOptionsList p, .TypeOptionsList h2, .ColorOptionsList h2, .ShapeOptionsList h2, .StyleOptionsList h2').forEach(element => element.classList.remove('disappear'));
    }

  }


  const initialSelection = {
    type: null,
    color: null,
    shape: null,
    designStyle: null,
    name: null
  }



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
    const colorRequiredTypes = ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque'];
    const isColorRequiredType = colorRequiredTypes.includes(selection.type);
    const hasBaseSelection = selection.type === 'Natural_Stone' || (isColorRequiredType && selection.color) || (!isColorRequiredType && selection.type !== 'Natural_Stone' && selection.shape);
    
    if (hasAdvancedPreviewerAccess && hasBaseSelection) {
      document.getElementById('StyleOptionsList')?.classList.add('active');
    } else {
      document.getElementById('StyleOptionsList')?.classList.remove('active');
    }

    // Show Accessories for Natural_Stone immediately, or for colorRequiredTypes when color is selected, or for other types when shape is selected
    if ((hasAdvancedPreviewerAccess && hasBaseSelection && selection.designStyle) || (!hasAdvancedPreviewerAccess && hasBaseSelection)) {
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
    
    // Three-condition if statements (most complicated)
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Heart_Shape") { selection.name = 'Martinez'; return Impala_Black_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Angel_Carved") { selection.name = 'Wietsma'; return Impala_Black_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Flat_Top") {selection.name = 'Weldon'; return Impala_Black_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Serpentine_Top") {selection.name = 'Casillas'; return Impala_Black_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Oval_Top") { selection.name = 'None';  return Impala_Black_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Impala_Black_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Impala_Black_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Apex_Top") {selection.name = 'None';  return Impala_Black_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Roof_Top") { selection.name = 'None';  return Impala_Black_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Heart_Shape") { selection.name = 'Gabrielli'; return Barre_Grey_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Angel_Carved") { selection.name = 'Rende'; return Barre_Grey_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Flat_Top") { selection.name = 'Shappe'; return Barre_Grey_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Serpentine_Top") { selection.name = 'Coakley'; return Barre_Grey_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Oval_Top") { selection.name = 'Smith'; return Barre_Grey_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Barre_Grey_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Barre_Grey_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Apex_Top") { selection.name = 'Thorsen'; return Barre_Grey_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Roof_Top") { selection.name = 'Camacho'; return Barre_Grey_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Heart_Shape") { selection.name = 'Cinelli'; return North_American_Pink_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Angel_Carved") { selection.name = 'Red Angel'; return North_American_Pink_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Flat_Top") { selection.name = 'Finnigan'; return North_American_Pink_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Serpentine_Top") { selection.name = 'Conforti'; return North_American_Pink_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Oval_Top") { selection.name = 'Zmudzinski'; return North_American_Pink_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None'; return North_American_Pink_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Half_Oval_Top") {
       selection.name = 'None';  return North_American_Pink_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Apex_Top") {
       selection.name = 'None';  return North_American_Pink_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Roof_Top") { selection.name = 'None';  return North_American_Pink_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Heart_Shape") {
       selection.name = 'None';  return Mahogany_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Angel_Carved") {
       selection.name = 'None';  return Mahogany_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Flat_Top") {
      selection.name = 'None';  return Mahogany_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Serpentine_Top") {
       selection.name = 'Ferdinand'; return Mahogany_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Oval_Top") {
      selection.name = 'None';  return Mahogany_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Mahogany_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Mahogany_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Apex_Top") { selection.name = 'None';  return Mahogany_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Roof_Top") { selection.name = 'None';  return Mahogany_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Heart_Shape") { selection.name = 'None';  return Cats_Eye_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Angel_Carved") {
      selection.name = 'None';  return Cats_Eye_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Flat_Top") { selection.name = 'None';  return Cats_Eye_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Serpentine_Top") { selection.name = 'Stockhamer'; return Cats_Eye_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Oval_Top") { selection.name = 'None';  return Cats_Eye_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Cats_Eye_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Cats_Eye_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Apex_Top") { selection.name = 'None';  return Cats_Eye_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Roof_Top") { selection.name = 'None';  return Cats_Eye_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Heart_Shape") { selection.name = 'None';  return Evergreen_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Angel_Carved") { selection.name = 'None';  return Evergreen_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Flat_Top") { selection.name = 'None';  return Evergreen_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Serpentine_Top") { selection.name = 'Seredynski'; return Evergreen_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Oval_Top") {selection.name = 'None';  return Evergreen_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Half_Serpentine_Top") {selection.name = 'None';  return Evergreen_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Half_Oval_Top") {selection.name = 'None';  return Evergreen_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Apex_Top") {selection.name = 'None';  return Evergreen_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Roof_Top") {selection.name = 'None';  return Evergreen_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Heart_Shape") { selection.name = 'Mason'; return Jet_Black_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Angel_Carved") { selection.name = 'Wietsma'; return Jet_Black_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Flat_Top") { selection.name = 'Weldon'; return Jet_Black_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Serpentine_Top") { selection.name = 'Rivera'; return Jet_Black_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Oval_Top") { selection.name = 'Mlikovich'; return Jet_Black_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Jet_Black_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Jet_Black_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Apex_Top") { selection.name = 'None';  return Jet_Black_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Roof_Top") { selection.name = 'None';  return Jet_Black_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Heart_Shape") { selection.name = 'None';  return Blue_Pearl_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Angel_Carved") { selection.name = 'None';  return Blue_Pearl_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Flat_Top") { selection.name = 'None';  return Blue_Pearl_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Serpentine_Top") { selection.name = 'Anderson'; return Blue_Pearl_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Oval_Top") { selection.name = 'None';  return Blue_Pearl_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Blue_Pearl_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Blue_Pearl_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Apex_Top") { selection.name = 'None';  return Blue_Pearl_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Roof_Top") { selection.name = 'None';  return Blue_Pearl_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Heart_Shape") {selection.name = 'None';  return Tropical_Green_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Angel_Carved") {selection.name = 'None';  return Tropical_Green_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Flat_Top") { selection.name = 'None';  return Tropical_Green_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Serpentine_Top") { selection.name = 'Meier'; return Tropical_Green_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Oval_Top") { selection.name = 'None';  return Tropical_Green_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Tropical_Green_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Tropical_Green_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Apex_Top") { selection.name = 'None';  return Tropical_Green_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Roof_Top") { selection.name = 'None';  return Tropical_Green_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Heart_Shape") { return Paradiso_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Angel_Carved") { return Paradiso_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Flat_Top") { return Paradiso_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Serpentine_Top") { selection.name = 'None';  return Paradiso_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Oval_Top") { selection.name = 'Krieger'; return Paradiso_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Paradiso_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Paradiso_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Apex_Top") { selection.name = 'None';  return Paradiso_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Roof_Top") { selection.name = 'None';  return Paradiso_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Heart_Shape") { selection.name = 'None';  return Bahama_Blue_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Angel_Carved") { selection.name = 'None';  return Bahama_Blue_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Flat_Top") { selection.name = 'None';  return Bahama_Blue_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Serpentine_Top") { selection.name = 'Giglio'; return Bahama_Blue_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Oval_Top") { selection.name = 'None';  return Bahama_Blue_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Bahama_Blue_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Bahama_Blue_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Apex_Top") { selection.name = 'None';  return Bahama_Blue_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Roof_Top") { selection.name = 'None';  return Bahama_Blue_Die_And_Base_Roof_Top; }

    // Add all other three-condition if statements for Monolith, Slant_Marker, Flush_Marker, Hickey_Marker here (similarly reordered)

    // Two-condition if statements
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black") {document.getElementById('ShapeOptionsList').classList.add('active'); return Impala_Black_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey") {document.getElementById('ShapeOptionsList').classList.add('active'); return Barre_Grey_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink") {document.getElementById('ShapeOptionsList').classList.add('active'); return North_American_Pink_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany") {document.getElementById('ShapeOptionsList').classList.add('active'); return Mahogany_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye") {document.getElementById('ShapeOptionsList').classList.add('active'); return Cats_Eye_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen") {document.getElementById('ShapeOptionsList').classList.add('active'); return Evergreen_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black") {document.getElementById('ShapeOptionsList').classList.add('active'); return Jet_Black_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl") {document.getElementById('ShapeOptionsList').classList.add('active'); return Blue_Pearl_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green") {document.getElementById('ShapeOptionsList').classList.add('active'); return Tropical_Green_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso") {document.getElementById('ShapeOptionsList').classList.add('active'); return Paradiso_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue") {document.getElementById('ShapeOptionsList').classList.add('active'); return Bahama_Blue_Die_And_Base; }

    // Add all other two-condition if statements for Monolith, Slant_Marker, Flush_Marker, Hickey_Marker, Bench here

        if (selection.type === "Die_And_Base" && selection.color === "Impala_Black") { return Impala_Black_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey") { return Barre_Grey_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink") { return North_American_Pink_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany") { return Mahogany_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye") { return Cats_Eye_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen") { return Evergreen_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black") { return Jet_Black_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl") { return Blue_Pearl_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green") { return Tropical_Green_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso") { return Paradiso_Die_And_Base; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue") { return Bahama_Blue_Die_And_Base; }

    // Monolith
    if (selection.type === "Monolith") {
      if (selection.color === "Impala_Black") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Impala_Black_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") {selection.name = 'None';  return Impala_Black_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Impala_Black_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'Wood'; return Impala_Black_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Impala_Black_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Impala_Black_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Impala_Black_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Impala_Black_Monolith_Roof_Top; }
        return Impala_Black_Monolith;
      }
      if (selection.color === "Barre_Grey") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Barre_Grey_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'Ettere'; return Barre_Grey_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Strandburg'; return Barre_Grey_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'Fornerod'; return Barre_Grey_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'Stanley Walker'; return Barre_Grey_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Barre_Grey_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Barre_Grey_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Barre_Grey_Monolith_Roof_Top; }
        return Barre_Grey_Monolith;
      }
      if (selection.color === "North_American_Pink") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") {selection.name = 'None';  return North_American_Pink_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return North_American_Pink_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Maynes'; return North_American_Pink_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return North_American_Pink_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return North_American_Pink_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return North_American_Pink_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return North_American_Pink_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return North_American_Pink_Monolith_Roof_Top; }
        return North_American_Pink_Monolith;
      }
      if (selection.color === "Mahogany") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Mahogany_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Mahogany_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Castellano'; return Mahogany_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Mahogany_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Mahogany_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Mahogany_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Mahogany_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Mahogany_Monolith_Roof_Top; }
        return Mahogany_Monolith;
      }
      if (selection.color === "Cats_Eye") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Cats_Eye_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Cats_Eye_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Cats_Eye_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Cats_Eye_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Cats_Eye_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Cats_Eye_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Cats_Eye_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Cats_Eye_Monolith_Roof_Top; }
        return Cats_Eye_Monolith;
      }
      if (selection.color === "Evergreen") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Evergreen_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Evergreen_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Evergreen_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Evergreen_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Evergreen_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Evergreen_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Evergreen_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Evergreen_Monolith_Roof_Top; }
        return Evergreen_Monolith;
      }
      if (selection.color === "Jet_Black") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Jet_Black_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'Bruckenthal'; return Jet_Black_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Delorier'; return Jet_Black_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Jet_Black_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Jet_Black_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Jet_Black_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Jet_Black_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Jet_Black_Monolith_Roof_Top; }
        return Jet_Black_Monolith;
      }
      if (selection.color === "Blue_Pearl") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Blue_Pearl_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Blue_Pearl_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Taskovich'; return Blue_Pearl_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Blue_Pearl_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Blue_Pearl_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Blue_Pearl_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Blue_Pearl_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Blue_Pearl_Monolith_Roof_Top; }
        return Blue_Pearl_Monolith;
      }
      if (selection.color === "Tropical_Green") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Tropical_Green_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Tropical_Green_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Tropical_Green_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Tropical_Green_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Tropical_Green_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Tropical_Green_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Tropical_Green_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Tropical_Green_Monolith_Roof_Top; }
        return Tropical_Green_Monolith;
      }
      if (selection.color === "Paradiso") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Paradiso_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Paradiso_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Paradiso_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'Reiter'; return Paradiso_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Paradiso_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Paradiso_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Paradiso_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Paradiso_Monolith_Roof_Top; }
        return Paradiso_Monolith;
      }
      if (selection.color === "Bahama_Blue") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { selection.name = 'None';  return Bahama_Blue_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Bahama_Blue_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Bahama_Blue_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Bahama_Blue_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { selection.name = 'None';  return Bahama_Blue_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { selection.name = 'None';  return Bahama_Blue_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { selection.name = 'None';  return Bahama_Blue_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { selection.name = 'None';  return Bahama_Blue_Monolith_Roof_Top; }
        return Bahama_Blue_Monolith;
      }
    }

    // Slant_Marker
    if (selection.type === "Slant_Marker") {
      if (selection.color === "Impala_Black") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'Pharr'; return Impala_Black_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Orellana'; return Impala_Black_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Impala_Black_Slant_Marker_Oval_Top; }
        return Impala_Black_Slant_Marker;
      }
      if (selection.color === "Barre_Grey") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'Robinson'; return Barre_Grey_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Brunetto'; return Barre_Grey_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'Kimbark'; return Barre_Grey_Slant_Marker_Oval_Top; }
        return Barre_Grey_Slant_Marker;
      }
      if (selection.color === "North_American_Pink") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'Pitzpatrick'; return North_American_Pink_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Duah'; return North_American_Pink_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'Brockway'; return North_American_Pink_Slant_Marker_Oval_Top; }
        return North_American_Pink_Slant_Marker;
      }
      if (selection.color === "Mahogany") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Mahogany_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Bell-Watson'; return Mahogany_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Mahogany_Slant_Marker_Oval_Top; }
        return Mahogany_Slant_Marker;
      }
      if (selection.color === "Cats_Eye") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Cats_Eye_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Cats_Eye_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Cats_Eye_Slant_Marker_Oval_Top; }
        return Cats_Eye_Slant_Marker;
      }
      if (selection.color === "Evergreen") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Evergreen_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Evergreen_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Evergreen_Slant_Marker_Oval_Top; }
        return Evergreen_Slant_Marker;
      }
      if (selection.color === "Jet_Black") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Jet_Black_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'Sheehy'; return Jet_Black_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Jet_Black_Slant_Marker_Oval_Top; }
        return Jet_Black_Slant_Marker;
      }
      if (selection.color === "Blue_Pearl") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'Hernandez'; return Blue_Pearl_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = "D'Onofrio"; return Blue_Pearl_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Blue_Pearl_Slant_Marker_Oval_Top; }
        return Blue_Pearl_Slant_Marker;
      }
      if (selection.color === "Tropical_Green") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Tropical_Green_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Tropical_Green_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Tropical_Green_Slant_Marker_Oval_Top; }
        return Tropical_Green_Slant_Marker;
      }
      if (selection.color === "Paradiso") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Paradiso_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Paradiso_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Paradiso_Slant_Marker_Oval_Top; }
        return Paradiso_Slant_Marker;
      }
      if (selection.color === "Bahama_Blue") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { selection.name = 'None';  return Bahama_Blue_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { selection.name = 'None';  return Bahama_Blue_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { selection.name = 'None';  return Bahama_Blue_Slant_Marker_Oval_Top; }
        return Bahama_Blue_Slant_Marker;
      }
    }

    // Flush_Marker
    if (selection.type === "Flush_Marker" && selection.color === "Impala_Black") {selection.name = 'White'; return Impala_Black_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Barre_Grey") { selection.name = 'Moore'; return Barre_Grey_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "North_American_Pink") { selection.name = 'Trotman'; return North_American_Pink_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Mahogany") { selection.name = 'None';  return Mahogany_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Cats_Eye") { selection.name = 'None';  return Cats_Eye_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Evergreen") { selection.name = 'Wu'; return Evergreen_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Jet_Black") { selection.name = 'DeMeo'; return Jet_Black_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Blue_Pearl") { selection.name = 'None';  return Blue_Pearl_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Tropical_Green") { selection.name = 'None';  return Tropical_Green_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Paradiso") { selection.name = 'None';  return Paradiso_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Bahama_Blue") { selection.name = 'None';  return Bahama_Blue_Flush_Marker; }

    // Hickey_Marker
    if (selection.type === "Hickey_Marker" && selection.color === "Impala_Black") { selection.name = 'None';  return Impala_Black_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Barre_Grey") { selection.name = 'Meek';  return Barre_Grey_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "North_American_Pink") { selection.name = 'Urban'; return North_American_Pink_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Mahogany") { selection.name = 'None';  return Mahogany_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Cats_Eye") { selection.name = 'None';  return Cats_Eye_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Evergreen") { selection.name = 'None';  return Evergreen_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Jet_Black") { selection.name = 'None';  return Jet_Black_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Blue_Pearl") { selection.name = 'Yessian'; return Blue_Pearl_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Tropical_Green") { selection.name = 'None';  return Tropical_Green_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Paradiso") { selection.name = 'None';  return Paradiso_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Bahama_Blue") { selection.name = 'None';  return Bahama_Blue_Hickey_Marker; }

    // Bench
    if (selection.type === "Bench" && selection.color === "Impala_Black") { selection.name = 'Capalbo';return Impala_Black_Bench; }
    if (selection.type === "Bench" && selection.color === "Barre_Grey") { selection.name = 'Reynolds'; return Barre_Grey_Bench; }
    if (selection.type === "Bench" && selection.color === "North_American_Pink") { selection.name = 'Gagliardi'; return North_American_Pink_Bench; }
    if (selection.type === "Bench" && selection.color === "Mahogany") { selection.name = 'Schiavone'; return Mahogany_Bench; }
    if (selection.type === "Bench" && selection.color === "Cats_Eye") { selection.name = 'None';  return Cats_Eye_Bench; }
    if (selection.type === "Bench" && selection.color === "Evergreen") { selection.name = 'None';  return Evergreen_Bench; }
    if (selection.type === "Bench" && selection.color === "Jet_Black") { selection.name = 'Mayer'; return Jet_Black_Bench; }
    if (selection.type === "Bench" && selection.color === "Blue_Pearl") { selection.name = 'Giordano'; return Blue_Pearl_Bench; }
    if (selection.type === "Bench" && selection.color === "Tropical_Green") { selection.name = 'None';  return Tropical_Green_Bench; }
    if (selection.type === "Bench" && selection.color === "Paradiso") { selection.name = 'None';  return Paradiso_Bench; }
    if (selection.type === "Bench" && selection.color === "Bahama_Blue") { selection.name = 'None';  return Bahama_Blue_Bench; }

    // Bronze Plaque

     if (selection.type === "Bronze_Plaque" && selection.color === "Impala_Black") { selection.name = 'None'; return Impala_Black_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Barre_Grey") { selection.name = 'None';  return Barre_Grey_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "North_American_Pink") { selection.name = 'George'; return North_American_Pink_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Mahogany") { selection.name = 'None';  return Mahogany_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Cats_Eye") { selection.name = 'None';  return Cats_Eye_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Evergreen") { selection.name = 'None';  return Evergreen_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Jet_Black") { selection.name = 'None';  return Jet_Black_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Blue_Pearl") { selection.name = 'None';  return Blue_Pearl_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Tropical_Green") { selection.name = 'None';  return Tropical_Green_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Paradiso") { selection.name = 'None';  return Paradiso_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Bahama_Blue") { selection.name = 'None';  return Bahama_Blue_Bronze_Plaque; }

    // One-condition if statements
    if (selection.type === "Die_And_Base") {document.getElementById('ColorOptionsList').classList.add('active'); return Die_And_Base; }
    if (selection.type === "Monolith") {document.getElementById('ColorOptionsList').classList.add('active');  return Monolith; }
    if (selection.type === "Slant_Marker") {document.getElementById('ColorOptionsList').classList.add('active'); return Slant_Marker;  }
    if (selection.type === "Flush_Marker") {document.getElementById('ColorOptionsList').classList.add('active');  return Flush_Marker; }
    if (selection.type === "Hickey_Marker") {document.getElementById('ColorOptionsList').classList.add('active'); return Hickey_Marker; }
    if (selection.type === "Bench") {document.getElementById('ColorOptionsList').classList.add('active');  return Bench; }
    if (selection.type === "Natural_Stone") { selection.name = 'Natural Stone';  return Natural_Stone; }
    if (selection.type === "Bronze_Plaque") { document.getElementById('ColorOptionsList').classList.add('active'); return Bronze_Plaque; }

    if (selection.color === "Impala_Black") { return Impala_Black; }
    if (selection.color === "Barre_Grey") { return Barre_Grey; }
    if (selection.color === "North_American_Pink") { return North_American_Pink; }
    if (selection.color === "Mahogany") {  return Mahogany; }
    if (selection.color === "Cats_Eye") {  return Cats_Eye; }
    if (selection.color === "Evergreen") {  return Evergreen; }
    if (selection.color === "Jet_Black") {  return Jet_Black; }
    if (selection.color === "Blue_Pearl") {  return Blue_Pearl; }
    if (selection.color === "Tropical_Green") {  return Tropical_Green; }
    if (selection.color === "Paradiso") { return Paradiso; }
    if (selection.color === "Bahama_Blue") { return Bahama_Blue; }

    if (selection.shape === "Heart_Shape") { return Heart_Shape; }
    if (selection.shape === "Angel_Carved") { return Angel_Carved; }
    if (selection.shape === "Flat_Top") { return Flat_Top; }
    if (selection.shape === "Serpentine_Top") { return Serpentine_Top; }
    if (selection.shape === "Oval_Top") { return Oval_Top; }
    if (selection.shape === "Half_Serpentine_Top") { return Half_Serpentine_Top; }
    if (selection.shape === "Half_Oval_Top") { return Half_Oval_Top; }
    if (selection.shape === "Apex_Top") { return Apex_Top; }
    if (selection.shape === "Roof_Top") { return Roof_Top; }
    
    
    
    

    return Logo; //default
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

    
    
    









 const handleShapeRemoveOnSelection = (e) => {
  document.querySelectorAll('.TypeSelected').forEach(el => el.classList.remove('TypeSelected'));
  e.target.classList.toggle('TypeSelected'), 500;

  setSelection({ ...selection, type: e.target.value, shape: null });
  setTypeSelected(e.target.innerHTML);
  document
    .getElementById("ShapeOptionsList")
    .classList.remove("active");
    document.querySelectorAll('.NonSlantOptions').forEach(el => el.classList.remove('hidden'));
    
};

const handleShapeAndColorRemoveOnSelection = (e) => {
  document.querySelectorAll('.TypeSelected').forEach(el => el.classList.remove('TypeSelected'));
  e.target.classList.toggle('TypeSelected'), 500;
  
  setSelection({ ...selection, type: e.target.value, color: null, shape: null });
  setTypeSelected(e.target.innerHTML);
  document
    .getElementById("ShapeOptionsList")
    .classList.remove("active");

    document
    .getElementById("ColorOptionsList")
    .classList.remove("active");
    document.querySelectorAll('.NonSlantOptions').forEach(el => el.classList.remove('hidden'));
    
    setColorSelected(initialColor);
    setShapeSelected(initialShape);
    document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected'));
    document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected'));
};

  const initialType = "Select Type";
  const initialColor = "Select Color";
  const initialShape = "Select Shape";
  const initialDesignStyle = 'Select Design Style';
  const navigate = useNavigate();
  const { isAuthenticated, plan } = useAuth();
  const hasAdvancedPreviewerAccess = canUseAdvancedPreviewer({ isAuthenticated, plan });
  const [typeSelected, setTypeSelected] = useState(initialType);
  const [colorSelected, setColorSelected] = useState(initialColor);
  const [shapeSelected, setShapeSelected] = useState(initialShape);
  const [designStyleSelected, setDesignStyleSelected] = useState(initialDesignStyle);
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

  const selectedAccessories = [vase, etching, bronzeEmblem, porcelainPhoto].filter(Boolean);
  const requiresColorStep = Boolean(selection.type) && selection.type !== 'Natural_Stone';
  const requiresShapeStep = Boolean(selection.type) && !COLOR_REQUIRED_TYPES.includes(selection.type) && selection.type !== 'Natural_Stone';

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
    {
      key: 'designStyle',
      label: 'Design Style',
      description: 'Apply the premium composition layer that makes the advanced previewer feel distinct.',
      summary: selection.designStyle ? designStyleSelected : 'Not selected',
      isComplete: Boolean(selection.designStyle),
    },
    {
      key: 'accessories',
      label: 'Accessories',
      description: 'Add optional memorial details once the main composition is locked in.',
      summary: selectedAccessories.length ? selectedAccessories.join(', ') : 'Optional',
      isComplete: true,
    },
  ];

  const currentAdvancedStep = advancedSteps.find((step) => step.key === activeAdvancedStep) || advancedSteps[0];

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

  const handleAdvancedTypeSelect = (typeValue, typeLabel) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      type: typeValue,
      color: null,
      shape: null,
      designStyle: null,
      name: null,
    }));
    setTypeSelected(typeLabel);
    setColorSelected(initialColor);
    setShapeSelected(initialShape);
    setDesignStyleSelected(initialDesignStyle);
    clearAccessorySelections();
  };

  const handleAdvancedColorSelect = (colorValue, colorLabel) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      color: colorValue,
      shape: null,
      designStyle: null,
      name: null,
    }));
    setColorSelected(colorLabel);
    setShapeSelected(initialShape);
    setDesignStyleSelected(initialDesignStyle);
    clearAccessorySelections();
  };

  const handleAdvancedShapeSelect = (shapeValue, shapeLabel) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      shape: shapeValue,
      designStyle: null,
      name: null,
    }));
    setShapeSelected(shapeLabel);
    setDesignStyleSelected(initialDesignStyle);
    clearAccessorySelections();
  };

  const handleAdvancedDesignStyleSelect = (styleValue, styleLabel) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      designStyle: styleValue,
    }));
    setDesignStyleSelected(styleLabel);
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
    if (!selection.type) {
      return true;
    }

    const disabledByType = {
      Heart_Shape: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
      Angel_Carved: ['Slant_Marker', 'Monolith', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
      Flat_Top: ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
      Serpentine_Top: ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
      Oval_Top: ['Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
      Half_Serpentine_Top: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
      Half_Oval_Top: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
      Apex_Top: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
      Roof_Top: ['Slant_Marker', 'Flush_Marker', 'Hickey_Marker', 'Bench', 'Bronze_Plaque', 'Natural_Stone'],
    };

    return disabledByType[shapeValue]?.includes(selection.type) || false;
  };

  const isAdvancedAccessoryDisabled = (accessoryValue) => {
    if (accessoryValue === 'Vase') {
      return selection.type === 'Natural_Stone' || selection.type === 'Monolith' || selection.type === 'Hickey_Marker';
    }

    if (accessoryValue === 'Etching') {
      return selection.color === 'Mahogany' || selection.color === 'Barre_Grey' || selection.color === 'North_American_Pink' || selection.color === 'Cats_Eye' || selection.color === 'Paradiso' || selection.type === 'Natural_Stone';
    }

    return false;
  };

  useEffect(() => {
    if (!hasAdvancedPreviewerAccess) {
      return;
    }

    const stepStillVisible = advancedSteps.some((step) => step.key === activeAdvancedStep);
    if (!stepStillVisible) {
      setActiveAdvancedStep(advancedSteps[0]?.key || 'type');
      return;
    }

    const firstIncompleteStep = advancedSteps.find((step) => !step.isComplete);
    if (!firstIncompleteStep) {
      return;
    }

    const activeStepIndex = advancedSteps.findIndex((step) => step.key === activeAdvancedStep);
    const incompleteStepIndex = advancedSteps.findIndex((step) => step.key === firstIncompleteStep.key);

    if (activeStepIndex !== -1 && incompleteStepIndex > activeStepIndex && advancedSteps[activeStepIndex]?.isComplete) {
      setActiveAdvancedStep(firstIncompleteStep.key);
    }
  }, [
    hasAdvancedPreviewerAccess,
    activeAdvancedStep,
    advancedSteps,
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
          : `${typeSelected !== initialType ? typeSelected : 'Custom design'} • ${colorSelected !== initialColor ? colorSelected : 'Custom color'} • ${shapeSelected !== initialShape ? shapeSelected : 'Custom shape'}`;

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
    const quoteRequestDraft = {
      title: designName.trim() || 'Untitled memorial design',
      type: selection.type || null,
      color: selection.color || null,
      shape: selection.shape || null,
      designStyle: selection.designStyle || DEFAULT_DESIGN_STYLE,
      wording: wording.trim(),
      accessories: getSelectedAccessoryValues(),
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
    };

    setSelection(nextSelection);
    setTypeSelected(project.type ? formatSelectionLabel(project.type) : initialType);
    setColorSelected(project.color ? formatSelectionLabel(project.color) : initialColor);
    setShapeSelected(project.shape ? formatSelectionLabel(project.shape) : initialShape);
    setDesignStyleSelected(project.designStyle ? formatDesignStyleLabel(project.designStyle) : initialDesignStyle);
    setDesignName(project.title || '');
    setWording(project.wording || '');
    setVase(project.accessories?.includes('Vase') ? 'Vase' : '');
    setEtching(project.accessories?.includes('Etching') ? 'Etching' : '');
    setBronzeEmblem(project.accessories?.includes('Bronze Emblem') ? 'Bronze Emblem' : '');
    setPorcelainPhoto(project.accessories?.includes('Porcelain Photo') ? 'Porcelain Photo' : '');
    setActiveAdvancedStep('accessories');

    document.getElementById('VaseInput').value = project.accessories?.includes('Vase') ? 'Vase' : '';
    document.getElementById('EtchingInput').value = project.accessories?.includes('Etching') ? 'Etching' : '';
    document.getElementById('BronzeEmblemInput').value = project.accessories?.includes('Bronze Emblem') ? 'Bronze Emblem' : '';
    document.getElementById('PorcelainPhotoInput').value = project.accessories?.includes('Porcelain Photo') ? 'Porcelain Photo' : '';

    document.querySelectorAll('.TypeSelected, .ColorSelected, .ShapeSelected, .StyleSelected, .AccessorySelected').forEach((element) => element.classList.remove('TypeSelected', 'ColorSelected', 'ShapeSelected', 'StyleSelected', 'AccessorySelected'));

    if (project.type) {
      document.getElementById(project.type)?.classList.add('TypeSelected');
    }

    if (project.color) {
      document.getElementById(project.color)?.classList.add('ColorSelected');
    }

    if (project.shape) {
      document.getElementById(project.shape)?.classList.add('ShapeSelected');
    }

    if (project.designStyle) {
      document.getElementById(project.designStyle)?.classList.add('StyleSelected');
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

    if (currentAdvancedStep.key === 'designStyle') {
      return DESIGN_STYLE_OPTIONS.map((styleOption) => (
        <button
          key={styleOption.value}
          type='button'
          className={`AdvancedOptionButton${selection.designStyle === styleOption.value ? ' selected' : ''}`}
          onClick={() => handleAdvancedDesignStyleSelect(styleOption.value, styleOption.label)}
        >
          <strong>{styleOption.label}</strong>
          <span>{styleOption.description}</span>
          <em>Advanced surcharge: ${styleOption.surcharge}</em>
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

  let SelectionImage = '';
  const selectedDesignStyleDetails = getDesignStyleDetails(selection.designStyle || DEFAULT_DESIGN_STYLE);
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
          <p className='AdvancedPreviewMessage'>{hasAdvancedPreviewerAccess ? 'Advanced preview mode unlocked. Add a design style before accessories to explore a richer memorial concept.' : getAdvancedPreviewerMessage({ isAuthenticated, plan })}</p>
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
        ) : null}
        <div className='Preview-Options' style={{ display: hasAdvancedPreviewerAccess ? 'none' : undefined }} aria-hidden={hasAdvancedPreviewerAccess}>
          <div className='TypeOptionsList'>
            <h2>Stone <br />Types</h2>
            <p className='TypeOptionSelected'>You selected: <br /><b>{typeSelected}</b></p>
            <button type='button' className='TypeOptionSelectedMobile' onClick={(e) => {document.querySelector('.TypeOptionsList ul').classList.toggle('disappear');
              
            }}>Type: {typeSelected} <FaAngleDown className='FaAngleDown' /></button>
            <ul>
              <button id='Die And Base' onClick={(e) =>{ document.querySelectorAll('.TypeSelected').forEach(el => el.classList.remove('TypeSelected'));
              e.target.classList.toggle('TypeSelected'), 200;
                setSelection({ ...selection, type: e.target.value })
                setTypeSelected(e.target.innerHTML);
                if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}; 
                document.getElementById('ShapeOptionsList').classList.remove('active');
                }} value="Die_And_Base">Die and Base</button>
              <button id='Monolith' onClick={(e) =>{ document.querySelectorAll('.TypeSelected').forEach(el => el.classList.remove('TypeSelected'));
  e.target.classList.toggle('TypeSelected'), 200;
                setSelection({ ...selection, type: e.target.value })
                setTypeSelected(e.target.innerHTML);
                if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')};
                document.getElementById('ShapeOptionsList').classList.remove('active');
                }} value="Monolith">Monolith</button>
              <button id='Slant_Marker' onClick={(e) =>{ document.querySelectorAll('.TypeSelected').forEach(el => el.classList.remove('TypeSelected'));
  e.target.classList.toggle('TypeSelected'), 200;
                setSelection({ ...selection, type: e.target.value})
                setTypeSelected(e.target.innerHTML);
                if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')};
                document.getElementById('ShapeOptionsList').classList.remove('active');
                }} value="Slant_Marker">Slant Marker</button>
              <button id='Flush_Marker' onClick={handleShapeRemoveOnSelection} value="Flush_Marker">Flush Marker</button>
              <button id='Hickey_Marker' onClick={handleShapeRemoveOnSelection} value="Hickey_Marker">Hickey Marker</button>
              <button id='Natural_Stone' onClick={handleShapeAndColorRemoveOnSelection} value="Natural_Stone">Natural Stone</button>
              <button id='Bench' onClick={handleShapeRemoveOnSelection} value="Bench">Bench</button>
              <button id='Bronze_Plaque' onClick={handleShapeRemoveOnSelection} value="Bronze_Plaque">Bronze Plaque</button>
            </ul>
                
            <button className='ResetButton' type='button' onClick={resetSelections}>Reset Selection</button>
          </div>

          <div id='ColorOptionsList' className='ColorOptionsList'>
            <h2>Stone <br />Colors</h2>
            <p className='ColorOptionSelected'>You selected: <br /><b>{colorSelected}</b></p>
            <button className='ColorOptionSelectedMobile' type='button' onClick={(e) => {document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
            }}>Color: {colorSelected} <FaAngleDown className='FaAngleDown' /></button>
            <ul>
              <button id='Impala_Black' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Impala_Black" disabled={selection.type === "Natural_Stone"}>Impala Black</button>
              <button id='Barre_Grey' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Barre_Grey" disabled={selection.type === "Natural_Stone"}>Barre Grey</button>
              <button id='North_American_Pink' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="North_American_Pink" disabled={selection.type === "Natural_Stone"}>North American Pink</button>
              <button id='Mahogany' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Mahogany" disabled={selection.type === "Natural_Stone"}>Mahogany</button>
              <button id='Cats_Eye' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Cats_Eye" disabled={selection.type === "Natural_Stone"}>Cats Eye Brown</button>
              <button id='Evergreen' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Evergreen" disabled={selection.type === "Natural_Stone"}>Evergreen</button>
              <button id='Jet_Black' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Jet_Black" disabled={selection.type === "Natural_Stone"}>Jet Black</button>
              <button id='Blue_Pearl' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Blue_Pearl" disabled={selection.type === "Natural_Stone"}>Blue Pearl</button>
              <button id='Tropical_Green' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Tropical_Green" disabled={selection.type === "Natural_Stone"}>Tropical Green</button>
              <button id='Paradiso' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Paradiso" disabled={selection.type === "Natural_Stone"}>Paradiso</button>
              <button id='Bahama_Blue' onClick={(e) =>{ document.querySelectorAll('.ColorSelected').forEach(el => el.classList.remove('ColorSelected')); document.querySelectorAll(' .ColorOptionsList ul, .ColorOptionsList p, .ColorOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ColorSelected'), 200; setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value }); if (combinationMessage === true) {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Bahama_Blue" disabled={selection.type === "Natural_Stone"}>Bahama Blue</button>
            </ul>
          </div>

          <div id='ShapeOptionsList' className='ShapeOptionsList'>
            <h2>Stone <br />Shapes</h2>
            <p className='ShapeOptionSelected'>You selected: <br /><b>{shapeSelected}</b></p>
            <button className='ShapeOptionSelectedMobile' type='button' onClick={(e) => {document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
            }}>Shape: {shapeSelected} <FaAngleDown className='FaAngleDown' /></button>
            <ul >
              <button className='NonSlantOptions' id='Heart_Shape' onClick={(e) =>{ document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Heart_Shape" disabled={selection.type === "Slant_Marker" || selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Heart Shape</button>
              <button className='NonSlantOptions' id='Angel_Carved' onClick={(e) =>{ document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Angel_Carved" disabled={selection.type === "Slant_Marker" || selection.type === "Monolith" || selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Angel Carved</button>
              <button id='Flat_Top' onClick={(e) =>{ document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Flat_Top" disabled={selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Flat Top</button>
              <button id='Serpentine_Top' onClick={(e) =>{ document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Serpentine_Top" disabled={selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Serpentine Top</button>
              <button id='Oval_Top' onClick={(e) =>{ document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Oval_Top" disabled={selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Oval Top</button>
              <button className='NonSlantOptions' id='Half_Serpentine_Top' onClick={(e) =>{ document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Half_Serpentine_Top" disabled={selection.type === "Slant_Marker" || selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Half Serpentine Top</button>
  
              <button 
              className='NonSlantOptions' 
              id='Half_Oval_Top' 
              onClick={(e) =>{ 
                document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
                e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); 
                setSelection({ ...selection, shape: e.target.value });
                if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') }
                else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Half_Oval_Top" disabled={selection.type === "Slant_Marker" || selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Half Oval Top</button>

              <button className='NonSlantOptions' id='Apex_Top' onClick={(e) =>{ document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Apex_Top" disabled={selection.type === "Slant_Marker" || selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Apex Top</button>
              <button className='NonSlantOptions' id='Roof_Top' onClick={(e) =>{ document.querySelectorAll('.ShapeSelected').forEach(el => el.classList.remove('ShapeSelected')); document.querySelectorAll(' .ShapeOptionsList ul, .ShapeOptionsList p, .ShapeOptionsList h2').forEach(element => element.classList.toggle('disappear'));
  e.target.classList.toggle('ShapeSelected'), 200; setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value }); if (selection.name === 'None') {document.getElementById('NoCombinationMessage').classList.remove('hidden') } else {document.getElementById('NoCombinationMessage').classList.add('hidden')}}} value="Roof_Top" disabled={selection.type === "Slant_Marker" || selection.type === "Flush_Marker" || selection.type === "Hickey_Marker" || selection.type === "Bench" || selection.type === "Bronze_Plaque" || selection.type === "Natural_Stone"}>Roof Top</button>
            </ul>
          </div>

          {hasAdvancedPreviewerAccess ? (
            <div id='StyleOptionsList' className='StyleOptionsList'>
              <h2>Design <br />Style</h2>
              <p className='StyleOptionSelected'>You selected: <br /><b>{designStyleSelected}</b></p>
              <button className='StyleOptionSelectedMobile' type='button' onClick={() => {document.querySelectorAll('.StyleOptionsList ul, .StyleOptionsList p, .StyleOptionsList h2').forEach(element => element.classList.toggle('disappear'));}}>
                Style: {designStyleSelected} <FaAngleDown className='FaAngleDown' />
              </button>
              <ul>
                {DESIGN_STYLE_OPTIONS.map((styleOption) => (
                  <button
                    key={styleOption.value}
                    id={styleOption.value}
                    type='button'
                    onClick={(event) => {
                      document.querySelectorAll('.StyleSelected').forEach((element) => element.classList.remove('StyleSelected'));
                      document.querySelectorAll('.StyleOptionsList ul, .StyleOptionsList p, .StyleOptionsList h2').forEach((element) => element.classList.toggle('disappear'));
                      event.target.classList.toggle('StyleSelected');
                      setDesignStyleSelected(styleOption.label);
                      setSelection({ ...selection, designStyle: styleOption.value });
                    }}
                  >
                    {styleOption.label}
                  </button>
                ))}
              </ul>
            </div>
          ) : null}

          <div id='AccessoriesOptionsList' className='AccessoriesOptionsList'>
            <h2>Accessories</h2>
            <ul>
              <button className='AccessoryOption' type='button' disabled={selection.type === 'Natural_Stone' || selection.type ==='Monolith' || selection.type ==='Hickey_Marker'} onClick={(e) => { e.target.classList.toggle('AccessorySelected'); if (document.getElementById('VaseInput').value === 'Vase') {document.getElementById('VaseInput').value = ''} else {document.getElementById('VaseInput').value = 'Vase'}}}>Vase</button>
              
              <button className='AccessoryOption' type='button' disabled={selection.color === 'Mahogany' || selection.color === 'Barre_Grey'|| selection.color === 'North_American_Pink'|| selection.color === 'Cats_Eye'|| selection.color === 'Paradiso'|| selection.type === 'Natural_Stone'} onClick={(e) => { e.target.classList.toggle('AccessorySelected'); if (document.getElementById('EtchingInput').value === 'Etching') {document.getElementById('EtchingInput').value = ''} else {document.getElementById('EtchingInput').value = 'Etching'}}}>Etching</button>
              
              <button className='AccessoryOption' type='button'  onClick={(e) => { e.target.classList.toggle('AccessorySelected'); if (document.getElementById('BronzeEmblemInput').value === 'Bronze Emblem') {document.getElementById('BronzeEmblemInput').value = ''} else {document.getElementById('BronzeEmblemInput').value = 'Bronze Emblem'}}}>Bronze Emblem</button>
              
              <button className='AccessoryOption' type='button' onClick={(e) => { e.target.classList.toggle('AccessorySelected'); if (document.getElementById('PorcelainPhotoInput').value === 'Porcelain Photo') {document.getElementById('PorcelainPhotoInput').value = ''} else {document.getElementById('PorcelainPhotoInput').value = 'Porcelain Photo'}}}>Porcelain Photo</button>
            </ul>
          </div>
           
          
        </div>
        <div className='Preview-Images'>
          <div className={`Preview-Container ${hasAdvancedPreviewerAccess ? selectedDesignStyleDetails.previewClassName : ''}`}>
            <div className='PreviewStyleBadge'>{hasAdvancedPreviewerAccess ? selectedDesignStyleDetails.label : 'Core Previewer'}</div>
            <img className='Image' id='Stone' src={imageSrc(selection)} alt="" />
          </div>
          <p id='NoCombinationMessage'  className='NoCombinationMessage hidden'>This combination has not been made yet. But if you'd like to see it, please let us know!</p>
          <div className='PreviewStyleCard'>
            <h3>{hasAdvancedPreviewerAccess ? selectedDesignStyleDetails.label : 'Simple preview flow'}</h3>
            <p>{hasAdvancedPreviewerAccess ? selectedDesignStyleDetails.description : 'Professional keeps the faster three-step previewer. Studio unlocks the more complex version with an added design-style layer before accessories.'}</p>
            {hasAdvancedPreviewerAccess ? <p className='PreviewStyleMeta'>Advanced style surcharge: ${selectedDesignStyleDetails.surcharge}</p> : null}
          </div>
        </div>

        <div className='PreviewHiddenFields' aria-hidden='true'>
          <input type='text' name='Image' id='ImageInput' value={SelectionImage} hidden readOnly />
          <input type='text' name='Type' id='TypeInput' value={typeSelected} hidden readOnly />
          <input type='text' name='Shape' id='ShapeInput' value={shapeSelected} hidden readOnly />
          <input type='text' name='Color' id='ColorInput' value={colorSelected} hidden readOnly />
          <input type='text' name='Design Style' id='DesignStyleInput' value={designStyleSelected === initialDesignStyle ? DEFAULT_DESIGN_STYLE : designStyleSelected} hidden readOnly />
          <input type='text' id='VaseInput' name='Would You Like a Vase?' hidden readOnly />
          <input type='text' id='EtchingInput' name='Would You Like an Etching?' hidden readOnly />
          <input type='text' id='BronzeEmblemInput' name='Would You Like a Bronze Emblem?' hidden readOnly />
          <input type='text' id='PorcelainPhotoInput' name='Would You Like a Porcelain Photo?' hidden readOnly />
        </div>
        
      </div>

      
    </>
    
  );
  
}


export default Previewer;
