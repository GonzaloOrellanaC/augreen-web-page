import React from 'react';
import {
  IonApp,
  setupIonicReact,
  IonRouterOutlet
} from '@ionic/react';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';



// Swiper
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import './App.css';
import './theme/variables.css';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Geotermia from './pages/Geotermia';
import Aerotermia from './pages/Aerotermia';
import SistemasDistribucion from './pages/SistemasDistribucion';
import RevistaViewer from './pages/RevistaViewer';
import { Route } from 'react-router-dom';
import { PanelesSolares, ClimatizacionInverter, BombasDeCalor, ServicioTecnico } from './ServicePages';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/info/geotermia">
            <Geotermia />
          </Route>
          <Route exact path="/info/aerotermia">
            <Aerotermia />
          </Route>
          <Route exact path="/info/distribucion">
            <SistemasDistribucion />
          </Route>
          <Route exact path="/revista-ozono-v37">
            <RevistaViewer />
          </Route>
          <Route exact path="/servicios/paneles">
            <PanelesSolares />
          </Route>
          <Route exact path="/servicios/climatizacion">
            <ClimatizacionInverter />
          </Route>
          <Route exact path="/servicios/bombas">
            <BombasDeCalor />
          </Route>
          <Route exact path="/servicios/tecnico">
            <ServicioTecnico />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
