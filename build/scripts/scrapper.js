(() => {
  // src/functions/autoscrolling.js
  var autoscrolling = (pixels) => new Promise((resolve, reject) => {
    let pixelstoScroll = pixels;
    console.log(pixelstoScroll);
    const idInterval = setInterval(() => {
      window.scrollTo(0, pixelstoScroll);
      pixelstoScroll += pixels;
      if (pixelstoScroll > document.body.scrollHeight) {
        clearInterval(idInterval);
        resolve(true);
      }
    }, 100);
  });
  var autoscrolling_default = autoscrolling;

  // src/functions/selector.js
  var $ = (selector, node = document) => node.querySelector(selector);
  var $x = (xpath, node = document) => {
    const collection = document.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null);
    let result = collection.iterateNext();
    const elements = [];
    while (result) {
      elements.push(result);
      result = collection.iterateNext();
    }
    return elements;
  };

  // src/functions/waitForElement.js
  var waitForElement = (selector) => new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (!$(selector).element) {
        clearInterval(interval);
        resolve();
      }
    }, 10);
    setTimeout(() => {
      reject();
    }, 1e4);
  });
  var waitForElement_default = waitForElement;

  // src/scripts/selectors.js
  var SELECTORS = {
    profile: {
      css: {
        fullname: "h1"
      },
      xpath: {
        educationItems: "(//section[.//span[contains(text(),'Educaci\xF3n')]]//ul)[1]/li",
        experiencieItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
      }
    },
    education: "(//section[.//span[contains(text(),'Educaci\xF3n')]]//ul)[3]//div//span[@aria-hidden='true']",
    experiencie: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li//div[2]/div[1]/div[1]//span[@aria-hidden='true']",
    search: {
      urlsProfiles: ".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }
  };
  var selectors_default = SELECTORS;

  // src/scripts/scrapper.js
  waitForElement_default("h1").then(() => {
    autoscrolling_default(30).then(() => {
      const fullName = $(selectors_default.profile.css.fullname).textContent;
      const experienceItems = $x(selectors_default.profile.xpath.experiencieItems);
      const educationItems = $x(selectors_default.profile.xpath.educationItems);
      const pruebaExperience = experienceItems.map((element) => $('span[aria-hidden="true"]', element)?.textContent);
      const pruebaEducation = educationItems.map((element) => $('span[aria-hidden="true"]', element)?.textContent);


      const experience = $x(selectors_default.experiencie);
      const education = $x(selectors_default.education);
      const experienceArr = experience.map((e) => e.textContent);
      const educationArr = education.map((e) => e.textContent);

      let port = chrome.runtime.connect({ name: "safePort" });

      let profile = {
        fullName,
        pruebaEducation,
        pruebaExperience
      };
      
      let arrayAuxExp = [];
      for (let i = 0; i < experienceArr.length; i++) {
        let experienciaDB = {};
        experienciaDB["role"] = experienceArr.shift();
        experienciaDB["place"] = experienceArr.shift();
        experienciaDB["period"] = experienceArr.shift();
        experienciaDB["country"] = experienceArr.shift();
        arrayAuxExp.push(experienciaDB);
      }

      let arrayAuxEduc = [];
      for (let i = 0; i < experienceArr.length; i++) {
        let educacionDB = {};
        educacionDB["place"] = educationArr.shift();
        educacionDB["role"] = educationArr.shift();
        educacionDB["period"] = educationArr.shift();
        educacionDB["country"] = educationArr.shift();
        arrayAuxEduc.push(educacionDB);
      }

      port.postMessage({ profile, arrAuxEdu, arrAuxExp });
      //port.postMessage({ fullName, pruebaExperience, pruebaEducation });
    });
  }).catch(() => {
    console.log("intentelo mas tarde");
  });
})();
