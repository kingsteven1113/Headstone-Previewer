import React from 'react';
import { useState } from 'react';
import './Previewer.css';
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
import Impala_Black_Monolith_Oval_Top from '../../assets/CJStonesLogo.jpg';
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
import Impala_Black_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Impala_Black_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Impala_Black_Slant_Marker_Flat_Top from '../../assets/Pharr.jpg';
import Impala_Black_Slant_Marker_Serpentine_Top from '../../assets/Orellana.jpg';
import Impala_Black_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Barre_Grey_Slant_Marker from '../../assets/Brunetto.jpg';
import Barre_Grey_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Barre_Grey_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Barre_Grey_Slant_Marker_Flat_Top from '../../assets/Robinson.jpg';
import Barre_Grey_Slant_Marker_Serpentine_Top from '../../assets/Brunetto.jpg';
import Barre_Grey_Slant_Marker_Oval_Top from '../../assets/Kimbark.JPG';
import Barre_Grey_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import North_American_Pink_Slant_Marker from '../../assets/Fitzpatrick.JPG';
import North_American_Pink_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import North_American_Pink_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import North_American_Pink_Slant_Marker_Flat_Top from '../../assets/Fitzpatrick.JPG';
import North_American_Pink_Slant_Marker_Serpentine_Top from '../../assets/Duah.jpg';
import North_American_Pink_Slant_Marker_Oval_Top from '../../assets/Brockway front set.jpg';
import North_American_Pink_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Mahogany_Slant_Marker from '../../assets/Watson.webp';
import Mahogany_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Mahogany_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Mahogany_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Slant_Marker_Serpentine_Top from '../../assets/Watson.webp';
import Mahogany_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Mahogany_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Cats_Eye_Slant_Marker from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Cats_Eye_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Cats_Eye_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Evergreen_Slant_Marker from '../../assets/CJStonesLogo.jpg';
import Evergreen_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Evergreen_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Evergreen_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Evergreen_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Jet_Black_Slant_Marker from '../../assets/Sheehy.JPG';
import Jet_Black_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Jet_Black_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Jet_Black_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Slant_Marker_Serpentine_Top from '../../assets/Sheehy.JPG';
import Jet_Black_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Blue_Pearl_Slant_Marker from '../../assets/Hernandez R.jpg';
import Blue_Pearl_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Slant_Marker_Flat_Top from '../../assets/Hernandez R.jpg';
import Blue_Pearl_Slant_Marker_Serpentine_Top from '../../assets/DOnofrio.jpg';
import Blue_Pearl_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Tropical_Green_Slant_Marker from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Tropical_Green_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Tropical_Green_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Paradiso_Slant_Marker from '../../assets/CJStonesLogo.jpg';
import Paradiso_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Paradiso_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Paradiso_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Paradiso_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Bahama_Blue_Slant_Marker from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Slant_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Slant_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Slant_Marker_Flat_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Slant_Marker_Serpentine_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Slant_Marker_Oval_Top from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Slant_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Slant_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Slant_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Slant_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Flush_Marker from '../../assets/Moore, Florence.JPG';
import Impala_Black_Flush_Marker from '../../assets/White.jpg';
import Impala_Black_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Impala_Black_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Impala_Black_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Barre_Grey_Flush_Marker from '../../assets/Moore, Florence.JPG';
import Barre_Grey_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Barre_Grey_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Barre_Grey_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import North_American_Pink_Flush_Marker from '../../assets/Trotman.jpg';
import North_American_Pink_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import North_American_Pink_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import North_American_Pink_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Mahogany_Flush_Marker from '../../assets/CJStonesLogo.jpg';
import Mahogany_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Mahogany_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Mahogany_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Cats_Eye_Flush_Marker from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Cats_Eye_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Cats_Eye_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Evergreen_Flush_Marker from '../../assets/Wu.jpeg';
import Evergreen_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Evergreen_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Evergreen_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Jet_Black_Flush_Marker from '../../assets/DeMeo.jpg';
import Jet_Black_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Jet_Black_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Jet_Black_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Blue_Pearl_Flush_Marker from '../../assets/CJStonesLogo.jpg';
import Blue_Pearl_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Tropical_Green_Flush_Marker from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Tropical_Green_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Tropical_Green_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Paradiso_Flush_Marker from '../../assets/CJStonesLogo.jpg';
import Paradiso_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Paradiso_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Paradiso_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Flush_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Flush_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Hickey_Marker from '../../assets/Meek installed.jpg';
import Impala_Black_Hickey_Marker from '../../assets/CJStonesLogo.jpg';
import Impala_Black_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Impala_Black_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Impala_Black_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Impala_Black_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Barre_Grey_Hickey_Marker from '../../assets/Meek installed.jpg';
import Barre_Grey_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Barre_Grey_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Barre_Grey_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Barre_Grey_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import North_American_Pink_Hickey_Marker from '../../assets/Urban.JPG';
import North_American_Pink_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import North_American_Pink_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import North_American_Pink_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import North_American_Pink_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Mahogany_Hickey_Marker from '../../assets/CJStonesLogo.jpg';
import Mahogany_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Mahogany_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Mahogany_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Mahogany_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Cats_Eye_Hickey_Marker from '../../assets/CJStonesLogo.jpg';
import Cats_Eye_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Cats_Eye_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Cats_Eye_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Cats_Eye_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Evergreen_Hickey_Marker from '../../assets/CJStonesLogo.jpg';
import Evergreen_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Evergreen_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Evergreen_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Evergreen_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Jet_Black_Hickey_Marker from '../../assets/CJStonesLogo.jpg';
import Jet_Black_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Jet_Black_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Jet_Black_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Jet_Black_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Blue_Pearl_Hickey_Marker from '../../assets/Yessian.jpg';
import Blue_Pearl_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Blue_Pearl_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

import Tropical_Green_Hickey_Marker from '../../assets/CJStonesLogo.jpg';
import Tropical_Green_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Tropical_Green_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Tropical_Green_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Tropical_Green_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker from '../../assets/CJStonesLogo.jpg';
import Paradiso_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Paradiso_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker from '../../assets/CJStonesLogo.jpg';
import Bahama_Blue_Hickey_Marker_Heart_Shape from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker_Angel_Carved from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker_Flat_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker_Oval_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker_Half_Serpentine_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker_Half_Oval_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker_Apex_Top from '../../assets/Casillas 2.jpg';
import Bahama_Blue_Hickey_Marker_Roof_Top from '../../assets/Casillas 2.jpg';

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



const Previewer = () => {



  function resetSelections() {
    setSelection(initialSelection);
    setTypeSelected(initialType);
    setColorSelected(initialColor);
    setShapeSelected(initialShape);
    document.getElementById('ColorOptionsList').classList.remove('active');
    document.getElementById('ShapeOptionsList').classList.remove('active');
  }


  const initialSelection = {
    type: null,
    color: null,
    shape: null,
  }



  const [selection, setSelection] = useState(initialSelection);

  const imageSrc = (selection) => {
    // Three-condition if statements (most complicated)
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Heart_Shape") { SelectionImage = 'Martinez'; return Impala_Black_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Angel_Carved") { SelectionImage = 'Wietsma'; return Impala_Black_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Flat_Top") {SelectionImage = 'Weldon'; return Impala_Black_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Serpentine_Top") {SelectionImage = 'Casillas'; return Impala_Black_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Oval_Top") { SelectionImage = 'None'; return Impala_Black_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Impala_Black_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Impala_Black_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Apex_Top") {SelectionImage = 'None'; return Impala_Black_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Impala_Black" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return Impala_Black_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Heart_Shape") { SelectionImage = 'Gabrielli'; return Barre_Grey_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Angel_Carved") { SelectionImage = 'Rende'; return Barre_Grey_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Flat_Top") { SelectionImage = 'Shappe'; return Barre_Grey_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Serpentine_Top") { SelectionImage = 'Coakley'; return Barre_Grey_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Oval_Top") { SelectionImage = 'Smith'; return Barre_Grey_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Barre_Grey_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Barre_Grey_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Apex_Top") { SelectionImage = 'Thorsen'; return Barre_Grey_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Barre_Grey" && selection.shape === "Roof_Top") { SelectionImage = 'Camacho'; return Barre_Grey_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Heart_Shape") { SelectionImage = 'Cinelli'; return North_American_Pink_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Angel_Carved") { SelectionImage = 'Red Angel'; return North_American_Pink_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Flat_Top") { SelectionImage = 'Finnigan'; return North_American_Pink_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Serpentine_Top") { SelectionImage = 'Conforti'; return North_American_Pink_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Oval_Top") { SelectionImage = 'Zmudzinski'; return North_American_Pink_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None';return North_American_Pink_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Half_Oval_Top") {
       SelectionImage = 'None'; return North_American_Pink_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Apex_Top") {
       SelectionImage = 'None'; return North_American_Pink_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "North_American_Pink" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return North_American_Pink_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Heart_Shape") {
       SelectionImage = 'None'; return Mahogany_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Angel_Carved") {
       SelectionImage = 'None'; return Mahogany_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Flat_Top") {
      SelectionImage = 'None'; return Mahogany_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Serpentine_Top") {
       SelectionImage = 'Ferdinand'; return Mahogany_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Oval_Top") {
      SelectionImage = 'None'; return Mahogany_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Mahogany_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Mahogany_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Apex_Top") { SelectionImage = 'None'; return Mahogany_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Mahogany" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return Mahogany_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Cats_Eye_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Angel_Carved") {
      SelectionImage = 'None'; return Cats_Eye_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Flat_Top") { SelectionImage = 'None'; return Cats_Eye_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Serpentine_Top") { SelectionImage = 'Stockhamer'; return Cats_Eye_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Oval_Top") { SelectionImage = 'None'; return Cats_Eye_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Cats_Eye_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Cats_Eye_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Apex_Top") { SelectionImage = 'None'; return Cats_Eye_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Cats_Eye" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return Cats_Eye_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Evergreen_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Angel_Carved") { SelectionImage = 'None'; return Evergreen_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Flat_Top") { SelectionImage = 'None'; return Evergreen_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Serpentine_Top") { SelectionImage = 'Seredynski'; return Evergreen_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Oval_Top") {SelectionImage = 'None'; return Evergreen_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Half_Serpentine_Top") {SelectionImage = 'None'; return Evergreen_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Half_Oval_Top") {SelectionImage = 'None'; return Evergreen_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Apex_Top") {SelectionImage = 'None'; return Evergreen_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Evergreen" && selection.shape === "Roof_Top") {SelectionImage = 'None'; return Evergreen_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Heart_Shape") { SelectionImage = 'Mason'; return Jet_Black_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Angel_Carved") { SelectionImage = 'Wietsma'; return Jet_Black_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Flat_Top") { SelectionImage = 'Weldon'; return Jet_Black_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Serpentine_Top") { SelectionImage = 'Rivera'; return Jet_Black_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Oval_Top") { SelectionImage = 'Mlikovich'; return Jet_Black_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Jet_Black_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Jet_Black_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Apex_Top") { SelectionImage = 'None'; return Jet_Black_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Jet_Black" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return Jet_Black_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Blue_Pearl_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Angel_Carved") { SelectionImage = 'None'; return Blue_Pearl_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Flat_Top") { SelectionImage = 'None'; return Blue_Pearl_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Serpentine_Top") { SelectionImage = 'Anderson'; return Blue_Pearl_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Oval_Top") { SelectionImage = 'None'; return Blue_Pearl_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Blue_Pearl_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Blue_Pearl_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Apex_Top") { SelectionImage = 'None'; return Blue_Pearl_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Blue_Pearl" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return Blue_Pearl_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Heart_Shape") {SelectionImage = 'None'; return Tropical_Green_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Angel_Carved") {SelectionImage = 'None'; return Tropical_Green_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Flat_Top") { SelectionImage = 'None'; return Tropical_Green_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Serpentine_Top") { SelectionImage = 'Meier'; return Tropical_Green_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Oval_Top") { SelectionImage = 'None'; return Tropical_Green_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Tropical_Green_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Tropical_Green_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Apex_Top") { SelectionImage = 'None'; return Tropical_Green_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Tropical_Green" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return Tropical_Green_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Heart_Shape") { return Paradiso_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Angel_Carved") { return Paradiso_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Flat_Top") { return Paradiso_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Paradiso_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Oval_Top") { SelectionImage = 'Krieger'; return Paradiso_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Paradiso_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Paradiso_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Apex_Top") { SelectionImage = 'None'; return Paradiso_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Paradiso" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return Paradiso_Die_And_Base_Roof_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Bahama_Blue_Die_And_Base_Heart_Shape; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Angel_Carved") { SelectionImage = 'None'; return Bahama_Blue_Die_And_Base_Angel_Carved; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Flat_Top") { SelectionImage = 'None'; return Bahama_Blue_Die_And_Base_Flat_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Serpentine_Top") { SelectionImage = 'Giglio'; return Bahama_Blue_Die_And_Base_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Oval_Top") { SelectionImage = 'None'; return Bahama_Blue_Die_And_Base_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Bahama_Blue_Die_And_Base_Half_Serpentine_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Bahama_Blue_Die_And_Base_Half_Oval_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Apex_Top") { SelectionImage = 'None'; return Bahama_Blue_Die_And_Base_Apex_Top; }
    if (selection.type === "Die_And_Base" && selection.color === "Bahama_Blue" && selection.shape === "Roof_Top") { SelectionImage = 'None'; return Bahama_Blue_Die_And_Base_Roof_Top; }

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
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Impala_Black_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") {SelectionImage = 'None'; return Impala_Black_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Impala_Black_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'Wood'; return Impala_Black_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Impala_Black_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Impala_Black_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Impala_Black_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Impala_Black_Monolith_Roof_Top; }
        return Impala_Black_Monolith;
      }
      if (selection.color === "Barre_Grey") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Barre_Grey_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'Ettere'; return Barre_Grey_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Strandburg'; return Barre_Grey_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'Fornerod'; return Barre_Grey_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'Stanley Walker'; return Barre_Grey_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Barre_Grey_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Barre_Grey_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Barre_Grey_Monolith_Roof_Top; }
        return Barre_Grey_Monolith;
      }
      if (selection.color === "North_American_Pink") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") {SelectionImage = 'None'; return North_American_Pink_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return North_American_Pink_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Maynes'; return North_American_Pink_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return North_American_Pink_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return North_American_Pink_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return North_American_Pink_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return North_American_Pink_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return North_American_Pink_Monolith_Roof_Top; }
        return North_American_Pink_Monolith;
      }
      if (selection.color === "Mahogany") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Mahogany_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Mahogany_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Castellano'; return Mahogany_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Mahogany_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Mahogany_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Mahogany_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Mahogany_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Mahogany_Monolith_Roof_Top; }
        return Mahogany_Monolith;
      }
      if (selection.color === "Cats_Eye") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Cats_Eye_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Cats_Eye_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Cats_Eye_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Cats_Eye_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Cats_Eye_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Cats_Eye_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Cats_Eye_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Cats_Eye_Monolith_Roof_Top; }
        return Cats_Eye_Monolith;
      }
      if (selection.color === "Evergreen") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Evergreen_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Evergreen_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Evergreen_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Evergreen_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Evergreen_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Evergreen_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Evergreen_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Evergreen_Monolith_Roof_Top; }
        return Evergreen_Monolith;
      }
      if (selection.color === "Jet_Black") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Jet_Black_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'Bruckenthal'; return Jet_Black_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Delorier'; return Jet_Black_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Jet_Black_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Jet_Black_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Jet_Black_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Jet_Black_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Jet_Black_Monolith_Roof_Top; }
        return Jet_Black_Monolith;
      }
      if (selection.color === "Blue_Pearl") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Blue_Pearl_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Blue_Pearl_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Taskovich'; return Blue_Pearl_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Blue_Pearl_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Blue_Pearl_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Blue_Pearl_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Blue_Pearl_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Blue_Pearl_Monolith_Roof_Top; }
        return Blue_Pearl_Monolith;
      }
      if (selection.color === "Tropical_Green") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Tropical_Green_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Tropical_Green_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Tropical_Green_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Tropical_Green_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Tropical_Green_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Tropical_Green_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Tropical_Green_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Tropical_Green_Monolith_Roof_Top; }
        return Tropical_Green_Monolith;
      }
      if (selection.color === "Paradiso") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Paradiso_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Paradiso_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Paradiso_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'Reiter'; return Paradiso_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Paradiso_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Paradiso_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Paradiso_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Paradiso_Monolith_Roof_Top; }
        return Paradiso_Monolith;
      }
      if (selection.color === "Bahama_Blue") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Heart_Shape") { SelectionImage = 'None'; return Bahama_Blue_Monolith_Heart_Shape; }
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Bahama_Blue_Monolith_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Bahama_Blue_Monolith_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Bahama_Blue_Monolith_Oval_Top; }
        if (selection.shape === "Half_Serpentine_Top") { SelectionImage = 'None'; return Bahama_Blue_Monolith_Half_Serpentine_Top; }
        if (selection.shape === "Half_Oval_Top") { SelectionImage = 'None'; return Bahama_Blue_Monolith_Half_Oval_Top; }
        if (selection.shape === "Apex_Top") { SelectionImage = 'None'; return Bahama_Blue_Monolith_Apex_Top; }
        if (selection.shape === "Roof_Top") { SelectionImage = 'None'; return Bahama_Blue_Monolith_Roof_Top; }
        return Bahama_Blue_Monolith;
      }
    }

    // Slant_Marker
    if (selection.type === "Slant_Marker") {
      if (selection.color === "Impala_Black") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'Pharr'; return Impala_Black_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Orellana'; return Impala_Black_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Impala_Black_Slant_Marker_Oval_Top; }
        return Impala_Black_Slant_Marker;
      }
      if (selection.color === "Barre_Grey") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'Robinson'; return Barre_Grey_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Brunetto'; return Barre_Grey_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'Kimbark'; return Barre_Grey_Slant_Marker_Oval_Top; }
        return Barre_Grey_Slant_Marker;
      }
      if (selection.color === "North_American_Pink") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'Pitzpatrick'; return North_American_Pink_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Duah'; return North_American_Pink_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'Brockway'; return North_American_Pink_Slant_Marker_Oval_Top; }
        return North_American_Pink_Slant_Marker;
      }
      if (selection.color === "Mahogany") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Mahogany_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Bell-Watson'; return Mahogany_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Mahogany_Slant_Marker_Oval_Top; }
        return Mahogany_Slant_Marker;
      }
      if (selection.color === "Cats_Eye") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Cats_Eye_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Cats_Eye_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Cats_Eye_Slant_Marker_Oval_Top; }
        return Cats_Eye_Slant_Marker;
      }
      if (selection.color === "Evergreen") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Evergreen_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Evergreen_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Evergreen_Slant_Marker_Oval_Top; }
        return Evergreen_Slant_Marker;
      }
      if (selection.color === "Jet_Black") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Jet_Black_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'Sheehy'; return Jet_Black_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Jet_Black_Slant_Marker_Oval_Top; }
        return Jet_Black_Slant_Marker;
      }
      if (selection.color === "Blue_Pearl") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'Hernandez'; return Blue_Pearl_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = "D'Onofrio"; return Blue_Pearl_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Blue_Pearl_Slant_Marker_Oval_Top; }
        return Blue_Pearl_Slant_Marker;
      }
      if (selection.color === "Tropical_Green") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Tropical_Green_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Tropical_Green_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Tropical_Green_Slant_Marker_Oval_Top; }
        return Tropical_Green_Slant_Marker;
      }
      if (selection.color === "Paradiso") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Paradiso_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Paradiso_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Paradiso_Slant_Marker_Oval_Top; }
        return Paradiso_Slant_Marker;
      }
      if (selection.color === "Bahama_Blue") {
        document.getElementById('ShapeOptionsList').classList.add('active');
        if (selection.shape === "Flat_Top") { SelectionImage = 'None'; return Bahama_Blue_Slant_Marker_Flat_Top; }
        if (selection.shape === "Serpentine_Top") { SelectionImage = 'None'; return Bahama_Blue_Slant_Marker_Serpentine_Top; }
        if (selection.shape === "Oval_Top") { SelectionImage = 'None'; return Bahama_Blue_Slant_Marker_Oval_Top; }
        return Bahama_Blue_Slant_Marker;
      }
    }

    // Flush_Marker
    if (selection.type === "Flush_Marker" && selection.color === "Impala_Black") {SelectionImage = 'White'; return Impala_Black_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Barre_Grey") { SelectionImage = 'Moore'; return Barre_Grey_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "North_American_Pink") { SelectionImage = 'Trotman'; return North_American_Pink_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Mahogany") { SelectionImage = 'None'; return Mahogany_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Cats_Eye") { SelectionImage = 'None'; return Cats_Eye_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Evergreen") { SelectionImage = 'Wu'; return Evergreen_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Jet_Black") { SelectionImage = 'DeMeo'; return Jet_Black_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Blue_Pearl") { SelectionImage = 'None'; return Blue_Pearl_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Tropical_Green") { SelectionImage = 'None'; return Tropical_Green_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Paradiso") { SelectionImage = 'None'; return Paradiso_Flush_Marker; }
    if (selection.type === "Flush_Marker" && selection.color === "Bahama_Blue") { SelectionImage = 'None'; return Bahama_Blue_Flush_Marker; }

    // Hickey_Marker
    if (selection.type === "Hickey_Marker" && selection.color === "Impala_Black") { SelectionImage = 'None'; return Impala_Black_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Barre_Grey") { SelectionImage = 'None'; return Barre_Grey_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "North_American_Pink") { SelectionImage = 'Urban'; return North_American_Pink_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Mahogany") { SelectionImage = 'None'; return Mahogany_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Cats_Eye") { SelectionImage = 'None'; return Cats_Eye_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Evergreen") { SelectionImage = 'None'; return Evergreen_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Jet_Black") { SelectionImage = 'None'; return Jet_Black_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Blue_Pearl") { SelectionImage = 'Yessian'; return Blue_Pearl_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Tropical_Green") { SelectionImage = 'None'; return Tropical_Green_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Paradiso") { SelectionImage = 'None'; return Paradiso_Hickey_Marker; }
    if (selection.type === "Hickey_Marker" && selection.color === "Bahama_Blue") { SelectionImage = 'None'; return Bahama_Blue_Hickey_Marker; }

    // Bench
    if (selection.type === "Bench" && selection.color === "Impala_Black") { SelectionImage = 'Capalbo';return Impala_Black_Bench; }
    if (selection.type === "Bench" && selection.color === "Barre_Grey") { SelectionImage = 'Reynolds'; return Barre_Grey_Bench; }
    if (selection.type === "Bench" && selection.color === "North_American_Pink") { SelectionImage = 'Gagliardi'; return North_American_Pink_Bench; }
    if (selection.type === "Bench" && selection.color === "Mahogany") { SelectionImage = 'Schiavone'; return Mahogany_Bench; }
    if (selection.type === "Bench" && selection.color === "Cats_Eye") { SelectionImage = 'None'; return Cats_Eye_Bench; }
    if (selection.type === "Bench" && selection.color === "Evergreen") { SelectionImage = 'None'; return Evergreen_Bench; }
    if (selection.type === "Bench" && selection.color === "Jet_Black") { SelectionImage = 'Mayer'; return Jet_Black_Bench; }
    if (selection.type === "Bench" && selection.color === "Blue_Pearl") { SelectionImage = 'Giordano'; return Blue_Pearl_Bench; }
    if (selection.type === "Bench" && selection.color === "Tropical_Green") { SelectionImage = 'None'; return Tropical_Green_Bench; }
    if (selection.type === "Bench" && selection.color === "Paradiso") { SelectionImage = 'None'; return Paradiso_Bench; }
    if (selection.type === "Bench" && selection.color === "Bahama_Blue") { SelectionImage = 'None'; return Bahama_Blue_Bench; }

    // Bronze Plaque

     if (selection.type === "Bronze_Plaque" && selection.color === "Impala_Black") { SelectionImage = 'None';return Impala_Black_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Barre_Grey") { SelectionImage = 'None'; return Barre_Grey_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "North_American_Pink") { SelectionImage = 'George'; return North_American_Pink_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Mahogany") { SelectionImage = 'None'; return Mahogany_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Cats_Eye") { SelectionImage = 'None'; return Cats_Eye_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Evergreen") { SelectionImage = 'None'; return Evergreen_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Jet_Black") { SelectionImage = 'None'; return Jet_Black_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Blue_Pearl") { SelectionImage = 'None'; return Blue_Pearl_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Tropical_Green") { SelectionImage = 'None'; return Tropical_Green_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Paradiso") { SelectionImage = 'None'; return Paradiso_Bronze_Plaque; }
    if (selection.type === "Bronze_Plaque" && selection.color === "Bahama_Blue") { SelectionImage = 'None'; return Bahama_Blue_Bronze_Plaque; }

    // One-condition if statements
    if (selection.type === "Die_And_Base") {document.getElementById('ColorOptionsList').classList.add('active'); return Die_And_Base; }
    if (selection.type === "Monolith") {document.getElementById('ColorOptionsList').classList.add('active');  return Monolith; }
    if (selection.type === "Slant_Marker") {document.getElementById('ColorOptionsList').classList.add('active'); return Slant_Marker;  }
    if (selection.type === "Flush_Marker") {document.getElementById('ColorOptionsList').classList.add('active');  return Flush_Marker; }
    if (selection.type === "Hickey_Marker") {document.getElementById('ColorOptionsList').classList.add('active'); return Hickey_Marker; }
    if (selection.type === "Bench") {document.getElementById('ColorOptionsList').classList.add('active');  return Bench; }
    if (selection.type === "Natural_Stone") { SelectionImage = 'Natural Stone';  return Natural_Stone; }
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

let SelectionImage = 'None'; 


 const handleShapeRemoveOnSelection = (e) => {
  setSelection({ ...selection, type: e.target.value, shape: null });
  setTypeSelected(e.target.innerHTML);
  document
    .getElementById("ShapeOptionsList")
    .classList.remove("active");
    document.querySelectorAll('.NonSlantOptions').forEach(el => el.classList.remove('hidden'));
};

const handleShapeAndColorRemoveOnSelection = (e) => {
  setSelection({ ...selection, type: e.target.value, color: null, shape: null });
  setTypeSelected(e.target.innerHTML);
  document
    .getElementById("ShapeOptionsList")
    .classList.remove("active");

    document
    .getElementById("ColorOptionsList")
    .classList.remove("active");
    document.querySelectorAll('.NonSlantOptions').forEach(el => el.classList.remove('hidden'));
};

  const initialType = "Select Type";
  const initialColor = "Select Color";
  const initialShape = "Select Shape";
 const [typeSelected, setTypeSelected] = useState(initialType);
 const [colorSelected, setColorSelected] = useState(initialColor);
 const [shapeSelected, setShapeSelected] = useState(initialShape);

  
  return (
    <>
      <h1>Welcome to the Headstone Previewer</h1>
      <div className="previewer-container">
        <div className='Preview-Options'>
          <div>
            <button className='TypeOptionSelected'>{typeSelected}</button>
            <ul className='TypeOptionsList'>
              <button id='Die And Base' onClick={(e) =>{
                setSelection({ ...selection, type: e.target.value })
                setTypeSelected(e.target.innerHTML);
                }} value="Die_And_Base">Die and Base</button>
              <button id='Monolith' onClick={(e) =>{
                setSelection({ ...selection, type: e.target.value })
                setTypeSelected(e.target.innerHTML);
                }} value="Monolith">Monolith</button>
              <button id='Slant_Marker' onClick={(e) =>{
                setSelection({ ...selection, type: e.target.value})
                setTypeSelected(e.target.innerHTML);
                }} value="Slant_Marker">Slant Marker</button>
              <button id='Flush_Marker' onClick={handleShapeRemoveOnSelection} value="Flush_Marker">Flush Marker</button>
              <button id='Hickey_Marker' onClick={handleShapeRemoveOnSelection} value="Hickey_Marker">Hickey Marker</button>
              <button id='Natural_Stone' onClick={handleShapeAndColorRemoveOnSelection} value="Natural_Stone">Natural Stone</button>
              <button id='Bench' onClick={handleShapeRemoveOnSelection} value="Bench">Bench</button>
              <button id='Bronze_Plaque' onClick={handleShapeRemoveOnSelection} value="Bronze_Plaque">Bronze Plaque</button>
            </ul>
          </div>

          <div id='ColorOptionsList' className='ColorOptionsList'>
            <button className='ColorOptionSelected'>{colorSelected}</button>
            <ul>
              <button id='Impala_Black' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Impala_Black">Impala Black</button>
              <button id='Barre_Grey' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Barre_Grey">Barre Grey</button>
              <button id='North_American_Pink' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="North_American_Pink">North American Pink</button>
              <button id='Mahogany' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Mahogany">Mahogany</button>
              <button id='Cats_Eye' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Cats_Eye">Cats Eye Brown</button>
              <button id='Evergreen' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Evergreen">Evergreen</button>
              <button id='Jet_Black' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Jet_Black">Jet Black</button>
              <button id='Blue_Pearl' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Blue_Pearl">Blue Pearl</button>
              <button id='Tropical_Green' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Tropical_Green">Tropical Green</button>
              <button id='Paradiso' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Paradiso">Paradiso</button>
              <button id='Bahama_Blue' onClick={(e) =>{ setColorSelected(e.target.innerHTML); setSelection({ ...selection, color: e.target.value })}} value="Bahama_Blue">Bahama Blue</button>
            </ul>
          </div>

          <div id='ShapeOptionsList' className='ShapeOptionsList'>   
            <button className='ShapeOptionSelected'>{shapeSelected}</button>
            <ul >
              <button className='NonSlantOptions' id='Heart_Shape' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Heart_Shape" disabled={selection.type === "Slant_Marker"}>Heart Shape</button>
              <button className='NonSlantOptions' id='Angel_Carved' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Angel_Carved" disabled={selection.type === "Slant_Marker" || selection.type === "Monolith"}>Angel Carved</button>
              <button id='Flat_Top' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Flat_Top">Flat Top</button>
              <button id='Serpentine_Top' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Serpentine_Top">Serpentine Top</button>
              <button id='Oval_Top' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Oval_Top">Oval Top</button>
              <button className='NonSlantOptions' id='Half_Serpentine_Top' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Half_Serpentine_Top" disabled={selection.type === "Slant_Marker"}>Half Serpentine Top</button>
              <button className='NonSlantOptions' id='Half_Oval_Top' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Half_Oval_Top" disabled={selection.type === "Slant_Marker"}>Half Oval Top</button>
              <button className='NonSlantOptions' id='Apex_Top' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Apex_Top" disabled={selection.type === "Slant_Marker"}>Apex Top</button>
              <button className='NonSlantOptions' id='Roof_Top' onClick={(e) =>{ setShapeSelected(e.target.innerHTML); setSelection({ ...selection, shape: e.target.value })}} value="Roof_Top" disabled={selection.type === "Slant_Marker"}>Roof Top</button>
            </ul>
          </div> 
        </div>
        <div className='Preview-Images'>
          <img className='Image' id='Stone' src={imageSrc(selection)} alt="" 
          />
          <p className='NoCombonationMessage' id='NoCombonationMessage'>This combination has not been created yet.</p>
          <button type='button' onClick={resetSelections}>Reset Options</button>
           <label className='AccessoryOptionsLabel' htmlFor="AccessoryOptionsList">Accessory Options:</label>
            <form className='PreviewForm' method='POST' onSubmit="submit" name='Submission' data-netlify="true" action="/">
            <div>
              <input type="text" name='Image' id='ImageInput' value={SelectionImage} readOnly/>
              <input type="text" name='Type' id='TypeInput' value={typeSelected} readOnly/>
              <input type="text" name='Shape' id='ShapeInput' value={shapeSelected} readOnly/>
              <input type="text" name='Color' id='ColorInput' value={colorSelected} readOnly/>
            </div>
            <div>
              <button type='button' onClick={(e) => { e.target.classList.toggle('Selected'); document.getElementById('VaseInput').value = 'Vase'}}>Vase</button>
              <input type='text' id='VaseInput' name='Vase Selection' readOnly/>
            </div>

            <div>
              <button type='button' onClick={(e) => { e.target.classList.toggle('Selected'); document.getElementById('EtchingInput').value = 'Etching'}}>Etching</button>
              <input type='text' id='EtchingInput' name='Etching Selection' readOnly/>
            </div>

            <div>
              <button type='button' onClick={(e) => { e.target.classList.toggle('Selected'); document.getElementById('BronzeEmblemInput').value = 'Bronze Emblem'}}>Bronze Emblem</button>
              <input type='text' id='BronzeEmblemInput' name='Bronze Emblem Selection' readOnly/>
            </div>

            <div>
              <button type='button' onClick={(e) => {e.target.classList.toggle('Selected'); document.getElementById('PorcelainPhotoInput').value = 'Porcelain Photo'}}>Porcelain Photo</button>
              <input type='text' id='PorcelainPhotoInput' name='Porcelain Photo Selection' placeholder='Yes or No?' readOnly/>
            </div>
            
            
            <textarea name="Wording" placeholder='All the wording that you would like to try to fit on the stone'/>

            <button type='submit'>Submit Options</button>
          
            </form>
          
          Did it work?

        </div>

        
      </div>

      
    </>
  );
}

export default Previewer;
