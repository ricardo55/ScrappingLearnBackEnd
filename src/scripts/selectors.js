const SELECTORS = {
    profile:{
        css:{
            fullname: "h1"

        },
        xpath:{
            educationItems: "(//section[.//span[contains(text(),'Educación')]]//ul)[1]/li",
            experiencieItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
        }
    },
    // Se agrego estas lineas para que funcione el selector de experiencia y el de educacion 
    education:"(//section[.//span[contains(text(),'Educación')]]//ul)[3]//div//span[@aria-hidden='true']",
    experiencie:"(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li//div[2]/div[1]/div[1]//span[@aria-hidden='true']",
    search:{
        urlsProfiles:".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }

}

export default SELECTORS