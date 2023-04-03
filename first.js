const SCREEN_WIDTH_HEADER_CHANGE_BEHAVIOR=925;
const SCREEN_WIDTH_HOW_IT_WORKS_CHANGE_BEHAVIOR=1205;
const HEADER_HEIGHT_TO_CONSIDER=90
let isCareersMenuLeftOpen=false;
initPage()
function initPage(){
    handlePageResize()
    appendCompanyImages()
    addEventListenersToEverythingInPage()
    setTimeout(()=>{
        const modalThankyouContainer=document.getElementById('modal-thankyou-container')
        const classModalThankyouContainer=modalThankyouContainer.getAttribute("class")
        if (classModalThankyouContainer==="none"){
            const modalFormContainer=document.getElementById('modal-form-container')
            modalFormContainer.className="modal-form-container"
        }
    },2000)
    function addEventListenersToEverythingInPage(){
        addEventListenerToHowItWorks()
        addEventListenerToQuestions()
        addEventListenerToLinksInWhyStudyWithUs()
        addEventListenerToModalsCloseButtons()
        addEventListenerToSubmitButtons()
        addEventListenerToHeaderLink("why-study-with-us-link","why-study-with-us-title")
        addEventListenerToHeaderLink("here-you-will-find-our-graduated-link","here-you-will-find-our-graduated-title")
        addEventListenerToHeaderLink("about-us-link","about-us-title")
        addEventListenerToHeaderLink("how-it-works-link","how-it-works-title")
        addEventListenerToHeaderLink("questions-probably-you-will-ask-link","questions-probably-you-will-ask-title")
        addEventListenerToHeaderLink("public-service-link","public-service-title")

        const homeLink=document.getElementById('home')
        homeLink.addEventListener('click',toggleMenu)

        window.addEventListener('resize',handlePageResize)

        const logoContainer=document.getElementById('logo-container')
        logoContainer.addEventListener('click',()=>{
            const startPage=document.getElementById('start-page')
            startPage.scrollIntoView()
            location.reload()
        })

        function addEventListenerToQuestions(){
            const publicServiceContainer=document.getElementById("public-service-container")
            const questionsProbablyYouWillAskContainer=document.getElementById("questions-probably-you-will-ask-container")
            publicServiceContainer.addEventListener('click',toggleAnswerToAppropriateQuestionIfNeeded)
            questionsProbablyYouWillAskContainer.addEventListener('click',toggleAnswerToAppropriateQuestionIfNeeded)
            // for (let questionNumber=1; questionNumber<=19;questionNumber++){
            //     const questionContainer=document.getElementById(questionNumber+"th-question")
            //     questionContainer.addEventListener('click',()=>{
            //         toggleAnswerToAppropriateQuestion(questionNumber)
            //     })
            // }
        }

        function addEventListenerToLinksInWhyStudyWithUs(){
            function addEventListenerToLink(linkElement,questionNumberToOpen){
                linkElement.addEventListener('click',()=>{
                    myScrollTo("public-service-title")
                    const answerContainer=document.getElementById("inner-menu-"+questionNumberToOpen+"th-question")
                    const answerContainerClass=answerContainer.getAttribute("class")
                    const isAnswerOpen=answerContainerClass==="inner-menu show"
                    if (!isAnswerOpen)
                        toggleAnswerToAppropriateQuestion(questionNumberToOpen)
                })
            }
            const firstParagraphInFirstBlock=document.getElementById("why-study-with-us-first-paragraph-first-block")
            const firstLinkElement=firstParagraphInFirstBlock.children[1]
            const secondLinkElement=firstParagraphInFirstBlock.lastElementChild
            addEventListenerToLink(firstLinkElement,19)
            addEventListenerToLink(secondLinkElement,14)
        }
        function addEventListenerToHowItWorks(){
            addEventListenerToBlock("diagnosis-advising-and-sorting")
            addEventListenerToBlock("training-course")
            addEventListenerToBlock("placement-process")
            addEventListenerToBlock("new-career")
            function addEventListenerToBlock(blockTitle){
                const blockElement=document.getElementById(blockTitle+"-container")
                blockElement.addEventListener('click',()=>{
                    if (window.innerWidth<SCREEN_WIDTH_HOW_IT_WORKS_CHANGE_BEHAVIOR){
                        const innerMenuElement=document.getElementById("inner-menu-"+blockTitle)
                        toggleAppropriateHowItWorksInnerMenu(innerMenuElement)
                    }
                })
            }
        }
        function addEventListenerToHeaderLink(idLink,idToScroll){
            const element=document.getElementById(idLink)
            element.addEventListener('click',(event)=>{
                event.preventDefault()
                myScrollTo(idToScroll)
            })
        }

        function addEventListenerToModalsCloseButtons(){
            const closeButtonThankyouModal=document.getElementById("modal-thankyou-close-button")
            closeButtonThankyouModal.addEventListener('click',()=>{
                const modalThankyouContainer=document.getElementById('modal-thankyou-container')
                modalThankyouContainer.className="none"
            })
            const closeButtonFormModal=document.getElementById("modal-form-close-button")
            closeButtonFormModal.addEventListener('click',()=>{
                const modalFormContainer=document.getElementById('modal-form-container')
                modalFormContainer.className="modal-form-container modal-form-close"
            })
        }

        function addEventListenerToSubmitButtons(){

            function addEventListenerToButton(formType){
                const buttonElement=document.getElementById(formType+"-form-submit-button")
                buttonElement.addEventListener('click',(event)=>{
                    event.preventDefault()
                    const nameInputElement=document.getElementById(formType+"-form-name-input")
                    const phoneInputElement=document.getElementById(formType+"-form-phone-input")
                    const mailInputElement=document.getElementById(formType+"-form-mail-input")
                    handleFormFilling(nameInputElement,phoneInputElement,mailInputElement,formType==="modal")
                })
            }

            addEventListenerToButton("modal")
            addEventListenerToButton("footer")
            addEventListenerToButton("middle")
        }
    }
}
function toggleAnswerToAppropriateQuestionIfNeeded(event){
    let id=event.target.getAttribute("id")
    if (id===null)
        id=event.target.parentElement.getAttribute("id")

    if (id===null||id.includes("inner-menu"))
        return

    const questionNumber=parseInt(id)
    if (questionNumber>0&&questionNumber<20)
        toggleAnswerToAppropriateQuestion(questionNumber)
}
function toggleAnswerToAppropriateQuestion(questionNumber){
    const answerContainer=document.getElementById("inner-menu-"+questionNumber+"th-question")
    const questionContainer=document.getElementById(questionNumber+"th-question")
    answerContainer.classList.toggle("show")
    const arrowIcon=questionContainer.lastElementChild
    arrowIcon.classList.toggle("rotate-arrow")
}
function appendCompanyImages(){
    const companyImagesContainer=document.getElementById('company-images-container')

    const companyImagesSources=
    [
        "C:/Users/Admin/Desktop/css projects/hyper-active/images/company1.png",
        "C:/Users/Admin/Desktop/css projects/hyper-active/images/company2.png",
        "C:/Users/Admin/Desktop/css projects/hyper-active/images/company3.png",
        "C:/Users/Admin/Desktop/css projects/hyper-active/images/company4.png",
        "C:/Users/Admin/Desktop/css projects/hyper-active/images/company5.png"
    ]

    let companyImagesSourcesIndex=0;
    for (let i=0;i<72;i++){
        const imgContainer=document.createElement("div")
        const img=document.createElement('img')
        img.setAttribute('src',companyImagesSources[companyImagesSourcesIndex])
        companyImagesContainer.appendChild(imgContainer)
        imgContainer.appendChild(img)
        companyImagesSourcesIndex=companyImagesSourcesIndex===4?0:(companyImagesSourcesIndex+1)
    }
}
function myScrollTo(idToScroll){
    const elementToScroll=document.getElementById(idToScroll)

    if (window.innerWidth<SCREEN_WIDTH_HEADER_CHANGE_BEHAVIOR){
        elementToScroll.scrollIntoView({behavior:"smooth"})
        return
    }

    window.scrollTo(0,elementToScroll.offsetTop-HEADER_HEIGHT_TO_CONSIDER)
} 
function handlePageResize(){
    const careersContainer=document.getElementById('career-links-container')
    const careers=document.getElementById('careers')
    const menuButton=document.getElementById('menu-button')

    if (window.innerWidth<SCREEN_WIDTH_HEADER_CHANGE_BEHAVIOR){
        menuButton.addEventListener('click',toggleMenu)
        careers.addEventListener('click',toggleCareersMenu)
        careersContainer.removeEventListener('mouseenter',toggleCareersMenu)
        careersContainer.removeEventListener('mouseleave',toggleCareersMenu)
        return
    }
    
    toggleMenu()
    careers.removeEventListener('click',toggleCareersMenu)
    careersContainer.addEventListener('mouseenter',toggleCareersMenu)
    careersContainer.addEventListener('mouseleave',toggleCareersMenu)
}
function toggleAppropriateHowItWorksInnerMenu(innerMenuElement){
    const plusSignElement=innerMenuElement.parentElement.firstElementChild.lastElementChild
    innerMenuElement.classList.toggle("inner-menu-how-it-works-show")
    plusSignElement.classList.toggle("rotate-plus-sign")
}
function toggleCareersMenu(){
    const careersMenu=document.getElementById('careers-menu')
    careersMenu.classList.toggle("none")

    if (window.innerWidth<SCREEN_WIDTH_HEADER_CHANGE_BEHAVIOR){
        const careersMenuClass=careersMenu.getAttribute('class')
        isCareersMenuLeftOpen=careersMenuClass!=="none"
        return
    }
    
    const careersContainer=document.getElementById('career-links-container')
    careersContainer.classList.toggle("career-links-container")
}

function toggleMenu(event){
    const menuButton=document.getElementById('menu-button')
    const menuButtonClass=menuButton.getAttribute('class')
    const menu=document.getElementById('menu-list')

    if (menuButtonClass!="menu-button-clicked"&&event!=undefined){
        menuButton.classList.add('menu-button-clicked')
        menu.classList.add('menu')
        if (isCareersMenuLeftOpen)
             toggleCareersMenu()
        return
    }

    menuButton.className=""
    menu.className=""
    const careersMenu=document.getElementById('careers-menu')
    const careersMenuClass=careersMenu.getAttribute('class')
    if (careersMenuClass!="none")
        careersMenu.classList.add('none')
    
}

function handleFormFilling(nameInputElement,phoneInputElement,mailInputElement,isModalForm=false){

    function handleOneInvalidInput(inputElement,message){
        inputElement.setAttribute("placeholder",message)
        inputElement.classList.add("invalid-input")
        inputElement.value=""
    }

    function isValidPhone(phone){
        if (phone.length!==10||phone[0]!=="0"||phone[1]!=="5")
            return false;
        for (let i=2; i<10;i++){
            switch(phone[i]){
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    break;
                default:
                    return false
            }
        }
        return true;
    }

    const nameInput=nameInputElement.value.trim()
    const phoneInput=phoneInputElement.value.trim()
    const mailInput=mailInputElement.value.trim()
    const validName=nameInput!==""
    const validPhone=isValidPhone(phoneInput)
    const validMail=mailInput.includes("@")

    if (!validName||!validPhone||!validMail){
        if (!validName)
            handleOneInvalidInput(nameInputElement,"*נא להזין שם תקין")
        if (!validPhone)
            handleOneInvalidInput(phoneInputElement,"*נא להזין מספר טלפון")
        if (!validMail)
            handleOneInvalidInput(mailInputElement,"*נא להזין כתובת מייל")
        return
    }

    if (!isModalForm){
        nameInputElement.setAttribute("placeholder","")
        phoneInputElement.setAttribute("placeholder","")
        mailInputElement.setAttribute("placeholder","")
    }
    else{
        const modalFormContainer=document.getElementById('modal-form-container')
        modalFormContainer.className="modal-form-container modal-form-close"
    }

    nameInputElement.value=""
    phoneInputElement.value=""
    mailInputElement.value=""
    phoneInputElement.classList.remove("invalid-input")
    nameInputElement.classList.remove("invalid-input")
    mailInputElement.classList.remove("invalid-input")

    const modalThankyouContainer=document.getElementById('modal-thankyou-container')
    modalThankyouContainer.className="modal-thankyou-container"
}

