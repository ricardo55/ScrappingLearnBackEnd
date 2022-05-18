import autoscrolling from "../functions/autoscrolling.js";
import { $, $x } from "../functions/selector.js";
import waitForElement from "../functions/waitForElement.js";
import SELECTORS from "./selectors.js";

waitForElement('h1')
   .then(() => {
      autoscrolling(30).then(() => {
         const fullName = $(SELECTORS.profile.css.fullname).textContent
         const experienceItems = $x(SELECTORS.profile.xpath.experiencieItems)
         const educationItems = $x(SELECTORS.profile.xpath.educationItems)

         // Codigo nuevo para obtener los datos de experiencia y educacion
         const experiencia = $x(SELECTORS.experiencie)
         const educacion = $x(SELECTORS.education)
         const arregloDeExperiencia = experiencia.map(e => e.textContent)
         const arregloDeEducacion = educacion.map(e => e.textContent)



         const pruebaExperience = experienceItems
            .map(element => $('span[aria-hidden="true"]', element)?.textContent);


         const pruebaEducation = educationItems
            .map(element => $('span[aria-hidden="true"]', element)?.textContent)

         let port = chrome.runtime.connect({ name: "safePort" })

         // Codigo para poder obtener los valores de experiencia y educacion en el arreglo
         // De donde se mete una palabra clave y de ahi las busca y descarga la info
         // de todos los que estan ahi


         let perfil = {
            fullName,
            pruebaEducation,
            pruebaExperience
         }

         let arregloAuxiliarExp = []

         for (let i = 0; i < arregloDeExperiencia.length; i++) {

            let experienciaDB = {}


            experienciaDB['role'] = arregloDeExperiencia.shift()
            experienciaDB['place'] = arregloDeExperiencia.shift()
            experienciaDB['period'] = arregloDeExperiencia.shift()
            experienciaDB['country'] = arregloDeExperiencia.shift()

            arregloAuxiliarExp.push(experienciaDB);

         }


         let arregloAuxEduc = []

         for (let i = 0; i < arregloDeExperiencia.length; i++) {
            let educacionDB = {}

            educacionDB['place'] = arregloDeEducacion.shift();
            educacionDB['role'] = arregloDeEducacion.shift();
            educacionDB['period'] = arregloDeEducacion.shift();
            educacionDB['country'] = arregloDeEducacion.shift();

            arregloAuxEduc.push(educacionDB);

         }



         port.postMessage({ perfil, arregloAuxEduc, arregloAuxiliarExp });
         //port.postMessage({ fullName, pruebaExperience, pruebaEducation })

      })
   })
   .catch(() => { console.log("intentelo mas tarde") })
