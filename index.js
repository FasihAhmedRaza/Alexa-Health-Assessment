const Alexa = require('ask-sdk-core');


// Question tree structure
const questions = require('./questions.json');

// const questions = {
//   "Do you have sleep apnea": {
//         "Yes": {
//             "Do you use a CPAP or BiPAP machine?": {
//                 "NO": "Do you snore loudly?",
//                 "Yes": "How many nights per week",
//             }
//         },
//         "No": "Can you do the following activities: Walk indoors?",
//         "Unsure": "Do you snore loudly?"
//     },
//     "Do you snore loudly?": {
//         "Yes": "Do you often feel tired, fatigued, or sleepy during the daytime?",
//         "No": "Do you often feel tired, fatigued, or sleepy during the daytime?"
//     },
    
//     "Do you often feel tired, fatigued, or sleepy during the daytime?": {
//         "Yes": "Has anyone observed you stop breathing during sleep?",
//         "No": "Has anyone observed you stop breathing during sleep?"
//     },
    
//     "Has anyone observed you stop breathing during sleep?": {
//         "Yes": "Can you do the following activities: Walk indoors?",
//         "No": "Can you do the following activities: Walk indoors?"
//     },
    
  

//     // Physical Activities Section
//     "Can you do the following activities: Walk indoors?": {
//         "Yes": "Walk 1-2 blocks on ground level?",
//         "No": "Walk 1-2 blocks on ground level?"
//     },
//     "Walk 1-2 blocks on ground level?": {
//         "Yes": "Climb a flight of stairs or walk up hill?",
//         "No": "Climb a flight of stairs or walk up hill?"
//     },
//     "Climb a flight of stairs or walk up hill?": {
//         "Yes": "Run a short distance?",
//         "No": "Run a short distance?"
//     },
//     "Run a short distance?": {
//         "Yes": "Do light house work like dusting or washing dishes?",
//         "No": "Do light house work like dusting or washing dishes?"
//     },
//     "Do light house work like dusting or washing dishes?": {
//         "Yes": "Do moderate house work like sweeping or carrying groceries?",
//         "No": "Do moderate house work like sweeping or carrying groceries?"
//     },
//     "Do moderate house work like sweeping or carrying groceries?": {
//         "Yes": "Do heavy housework like moving heavy furniture?",
//         "No": "Do heavy housework like moving heavy furniture?"
//     },
//     "Do heavy housework like moving heavy furniture?": {
//         "Yes": "Do yardwork?",
//         "No": "Do yardwork?"
//     },
//     "Do yardwork?": {
//         "Yes": "Have sexual relations?",
//         "No": "Have sexual relations?"
//     },
//     "Have sexual relations?": {
//         "Yes": "Participate in moderate recreational activities like golfing or dancing?",
//         "No": "Participate in moderate recreational activities like golfing or dancing?"
//     },
//     "Participate in moderate recreational activities like golfing or dancing?": {
//         "Yes": "Participate in strenuous sports like swimming, skiing, or baseball?",
//         "No": "Participate in strenuous sports like swimming, skiing, or baseball?"
//     },
//     "Participate in strenuous sports like swimming, skiing, or baseball?": {
//         "Yes": "Do you require help from others, including family or caretakers, to complete daily tasks?",
//         "No": "Do you require help from others, including family or caretakers, to complete daily tasks?"
//     },

//     // Daily Assistance Section
//     "Do you require help from others, including family or caretakers, to complete daily tasks?": {
//         "Yes": {
//             "Are you able to complete tasks such as bathing, using the bathroom, and eating on your own?": {
//                 "Yes": "Do you have high blood pressure?",
//                 "No": "Do you have high blood pressure?"
//             }
//         },
//         "No": "Do you have high blood pressure?"
//     },

//     // Blood Pressure Section
//     "Do you have high blood pressure?": {
//         "Yes": {
//             "Are you on blood pressure medications?": {
//                 "Yes": {
//                     "Is your blood pressure well controlled on these medications?": {
//                         "Yes": "Have you ever had a blood clot, stroke, or transient ischemic attack?",
//                         "No": {
//                             "Do you regularly check your blood pressure at home?": {
//                                 "Yes": "What are your typical readings?",
//                                 "No": "Have you ever had a blood clot, stroke, or transient ischemic attack?"
//                             }
//                         }
//                     }
//                 },
//                 "No": "Have you ever had a blood clot, stroke, or transient ischemic attack?"
//             }
//         },
//         "No": "Have you ever had a blood clot, stroke, or transient ischemic attack?"
//     },

//     // Blood Clot/Stroke Section
//     "Have you ever had a blood clot, stroke, or transient ischemic attack?": {
//         "Yes": {
//             "Was it in the last year?": {
//                 "Yes": {
//                     "Was surgical intervention, such as thrombectomy, required?": {
//                         "Yes": "Do you have any long term complications such as weakness or speech problems?",
//                         "No": "Do you have any long term complications such as weakness or speech problems?"
//                     }
//                 },
//                 "No": "Do you have any long term complications such as weakness or speech problems?"
//             }
//         },
//         "No": "Are you currently on blood thinners, such as aspirin, coumadin, plavix?"
//     },
//     "Do you have any long term complications such as weakness or speech problems?": {
//         "Yes": {
//             "Describe your weakness": {
//                 "type": "text",
//                 "next": "Are you currently on blood thinners, such as aspirin, coumadin, plavix?"
//             }
//         },
//         "No": "Are you currently on blood thinners, such as aspirin, coumadin, plavix?"
//     },

//     // Blood Thinners Section
//     "Are you currently on blood thinners, such as aspirin, coumadin, plavix?": {
//         "Yes": {
//             "Which medications and which doses?": {
//                 "type": "text",
//                 "next": "Have you ever experienced excessive bleeding or bruising from these medications?"
//             }
//         },
//         "No": "Have you ever been diagnosed with a bleeding disorder?"
//     },
//     "Have you ever experienced excessive bleeding or bruising from these medications?": {
//         "Yes": "Have you ever been diagnosed with a bleeding disorder?",
//         "No": "Have you ever been diagnosed with a bleeding disorder?"
//     },

//     // Bleeding Disorder Section
//     "Have you ever been diagnosed with a bleeding disorder?": {
//         "Yes": {
//             "Which disorder?": {
//                 "type": "text",
//                 "next": "Have you ever had a heart attack or angina?"
//             }
//         },
//         "No": "Have you ever had a heart attack or angina?"
//     },

//     // Heart Conditions Section
//     "Have you ever had a heart attack or angina?": {
//         "Yes": {
//             "Do you have a stent?": {
//                 "Yes": "Do you have a graft?",
//                 "No": "Do you have a graft?"
//             }
//         },
//         "No": "Have you ever been diagnosed with congestive heart failure?"
//     },
//     "Do you have a graft?": {
//         "Yes": "Do you have a pacemaker?",
//         "No": "Do you have a pacemaker?"
//     },
//     "Do you have a pacemaker?": {
//         "Yes": "Have you ever been diagnosed with congestive heart failure?",
//         "No": "Have you ever been diagnosed with congestive heart failure?"
//     },

//     // Heart Failure Section
//     "Have you ever been diagnosed with congestive heart failure?": {
//         "Yes": "Do you have diabetes?",
//         "No": "Do you have diabetes?"
//     },

//     // Diabetes Section
//     "Do you have diabetes?": {
//         "Yes": {
//             "What was your last A1c?": {
//                 "type": "text",
//                 "next": "Do you require insulin at home?"
//             }
//         },
//         "No": "Do you have a history of motion sickness or post-operative nausea and vomiting?"
//     },
//     "Do you require insulin at home?": {
//         "Yes": "Do you have a history of motion sickness or post-operative nausea and vomiting?",
//         "No": "Do you have a history of motion sickness or post-operative nausea and vomiting?"
//     },

//     // Nausea/Vomiting Section
//     "Do you have a history of motion sickness or post-operative nausea and vomiting?": {
//         "Yes": {
//             "Have you ever required postoperative opioids?": {
//                 "Yes": "Do you have kidney disease?",
//                 "No": "Do you have kidney disease?"
//             }
//         },
//         "No": "Do you have kidney disease?"
//     },

//     // Kidney Disease Section
//     "Do you have kidney disease?": {
//         "Yes": {
//             "Is it dialysis dependent?": {
//                 "Yes": {
//                     "How many times per week are you undergoing dialysis": {
//                         "type": "text",
//                         "next": "Are you on any medications to manage your kidney disease?"
//                     }
//                 },
//                 "No": "Are you on any medications to manage your kidney disease?"
//             }
//         },
//         "No": "Are you pregnant or is there a chance of you being pregnant?"
//     },
//     "Are you on any medications to manage your kidney disease?": {
//         "Yes": {
//             "Which medications?": {
//                 "type": "text",
//                 "next": "Are you pregnant or is there a chance of you being pregnant?"
//             }
//         },
//         "No": "Are you pregnant or is there a chance of you being pregnant?"
//     },

//     // Pregnancy Section
//     "Are you pregnant or is there a chance of you being pregnant?": {
//         "Yes": {
//             "Have you taken a pregnancy test as confirmation?": {
//                 "Yes": {
//                     "How far along are you in your pregnancy?": {
//                         "type": "text",
//                         "next": "Do you currently smoke cigarettes?"
//                     }
//                 },
//                 "No": "Do you currently smoke cigarettes?"
//             }
//         },
//         "No": "Do you currently smoke cigarettes?"
//     },

//     // Smoking Section
//     "Do you currently smoke cigarettes?": {
//         "Yes": {
//             "How many cigarettes per day?": {
//                 "type": "text",
//                 "next": "Do you have COPD, asthma, or emphysema?"
//             }
//         },
//         "No": "Do you have COPD, asthma, or emphysema?"
//     },

//     // Respiratory Conditions Section
//     "Do you have COPD, asthma, or emphysema?": {
//         "Yes": {
//             "Do you use daily inhaler?": {
//                 "Yes": "Do you have an active cough, wheezing, or shortness of breath?",
//                 "No": "Do you have an active cough, wheezing, or shortness of breath?"
//             }
//         },
//         "No": "Have you had a respiratory infection in the last month that required antibiotic use?"
//     },
//     "Do you have an active cough, wheezing, or shortness of breath?": {
//         "Yes": "Have you had a respiratory infection in the last month that required antibiotic use?",
//         "No": "Have you had a respiratory infection in the last month that required antibiotic use?"
//     },

//     // Respiratory Infection Section
//     "Have you had a respiratory infection in the last month that required antibiotic use?": {
//         "Yes": "Do you currently require steroids for a chronic condition?",
//         "No": "Do you currently require steroids for a chronic condition?"
//     },

//     // Steroids Section
//     "Do you currently require steroids for a chronic condition?": {
//         "Yes": "Do you currently drink alcohol?",
//         "No": "Do you currently drink alcohol?"
//     },

//     // Alcohol Section
//     "Do you currently drink alcohol?": {
//         "Yes": {
//             "How many drinks do you drink per week?": {
//                 "type": "text",
//                 "next": "How long was your last drink?"
//             }
//         },
//         "No": "Do you use recreational drugs?"
//     },
//     "How long was your last drink?": {
//         "type": "text",
//         "next": "Do you use recreational drugs?"
//     },

//     // Recreational Drugs Section
//     "Do you use recreational drugs?": {
//         "Yes": {
//             "Do you use opioids, such as morphine, dilaudid, or heroin, on a regular basis?": {
//                 "Yes": {
//                     "Have you ever required post-operative opioids?": {
//                         "Yes": "Are you going to have intraperitoneal, intrathoracic, or suprainguinal surgery?",
//                         "No": "Do you use IV drugs?"
//                     }
//                 },
//                 "No": "Do you use IV drugs?"
//             }
//         },
//         "No": "Are you going to have intraperitoneal, intrathoracic, or suprainguinal surgery?"
//     },
//     "Do you use IV drugs?": {
//         "Yes": {
//             "Have you ever had an infection related to IV drug use?": {
//                 "Yes": "Are you going to have intraperitoneal, intrathoracic, or suprainguinal surgery?",
//                 "No": "Are you going to have intraperitoneal, intrathoracic, or suprainguinal surgery?"
//             }
//         },
//         "No": "Are you going to have intraperitoneal, intrathoracic, or suprainguinal surgery?"
//     },

//     // Surgical Questions (from chart)
//     "Are you going to have intraperitoneal, intrathoracic, or suprainguinal surgery?": {
//         "Yes": "Is your creatinine greater than 2 mg/dl?",
//         "No": "Is your creatinine greater than 2 mg/dl?"
//     },
//     "Is your creatinine greater than 2 mg/dl?": {
//         "Yes": "Is your age > 50?",
//         "No": "Is your age > 50?"
//     },
//     "Is your age > 50?": {
//         "Yes": {
//             "Is your age > 80?": {
//                 "Yes": "Is your BMI > 35 kg/m2?",
//                 "No": "Is your BMI > 35 kg/m2?"
//             }
//         },
//         "No": "Is your BMI > 35 kg/m2?"
//     },
//     "Is your BMI > 35 kg/m2?": {
//         "Yes": "Is your neck circumference over 40?",
//         "No": "Is your neck circumference over 40?"
//     },
//     "Is your neck circumference over 40?": {
//         "Yes": "Is your pre-operative hemoglobin below 10 g/dl?",
//         "No": "Is your pre-operative hemoglobin below 10 g/dl?"
//     },
//     "Is your pre-operative hemoglobin below 10 g/dl?": {
//         "Yes": "What it an emergency surgery?",
//         "No": "What it an emergency surgery?"
//     },
//     "What it an emergency surgery?": {
//         "Yes": "END", 
//         "No": "END"  
//     }
// };

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello welcome to your ai nurse assessments for your pre operative anesthesia clearance.  Pls answer the questions with YES or NO  or Maybe or Unsure if necessary.  Takes approximately 5 minutes   Please say yes to start.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function getNextQuestion(currentQuestion, answer, questionTree) {
    // Normalize the answer to handle case variations
    const normalizedAnswer = answer.toLowerCase() === 'yes' ? 'Yes' : 
                              answer.toLowerCase() === 'no' ? 'No' : 
                              answer;

    // Special handling for CPAP machine question
    if (currentQuestion === "Do you use a CPAP or BiPAP machine?") {
        if (normalizedAnswer === "No") {
            return "Do you snore loudly?";
        }
        if (normalizedAnswer === "Yes") {
            return "How many nights per week?";
        }
    }

   const currentBranch = questionTree[currentQuestion];

    if (!currentBranch) return null;

    // Handle simple string paths
    if (typeof currentBranch === 'string') {
        return currentBranch;
    }

    // Handle nested question paths
    if (currentBranch[normalizedAnswer]) {
        const nextNode = currentBranch[normalizedAnswer];
        
        if (typeof nextNode === 'string') {
            return nextNode;
        }
        
        if (typeof nextNode === 'object') {
            // For nested questions, return the first question key
            const nextQuestion = Object.keys(nextNode)[0];
            return nextQuestion;
        }
    }

    return null;
}


const StartQuestionnaireIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartQuestionnaireIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        sessionAttributes.currentQuestion = "Do you have sleep apnea";
        sessionAttributes.questionHistory = ["Do you have sleep apnea"];
        sessionAttributes.answers = {};
        
        attributesManager.setSessionAttributes(sessionAttributes);
        
        return handlerInput.responseBuilder
            .speak(sessionAttributes.currentQuestion)
            .reprompt(sessionAttributes.currentQuestion)
            .getResponse();
    }
};

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerIntent' 
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'NumberAnswerIntent');
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        if (!sessionAttributes.currentQuestion) {
            return handlerInput.responseBuilder
                .speak("Please start the questionnaire by saying 'start questionnaire'.")
                .getResponse();
        }
        
        let answer;
        if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'NumberAnswerIntent') {
            answer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'number');
        } else {
            answer = Alexa.getSlotValue(handlerInput.requestEnvelope, 'answer').toLowerCase();
        }
        
        // Store the answer
        sessionAttributes.answers[sessionAttributes.currentQuestion] = answer;
        
        // Get the next question
        let nextQuestion = getNextQuestion(sessionAttributes.currentQuestion, answer, questions);
        
        // If we've reached the end of a branch
        if (!nextQuestion || nextQuestion === "END") {
            const speakOutput = "Thanks for answering   Your care team is ill review and get back to you on next steps.   Have a nice day";
            sessionAttributes.currentQuestion = null;
            attributesManager.setSessionAttributes(sessionAttributes);
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
        
        // Update session attributes
        sessionAttributes.currentQuestion = nextQuestion;
        if (!sessionAttributes.questionHistory) {
            sessionAttributes.questionHistory = [];
        }
        sessionAttributes.questionHistory.push(nextQuestion);
        attributesManager.setSessionAttributes(sessionAttributes);
        
        return handlerInput.responseBuilder
            .speak(nextQuestion)
            .reprompt(nextQuestion)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'This is the Smart Nurse questionnaire. You can answer questions with yes, no, or unsure. To begin, say "start questionnaire".';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${Alexa.getRequest(handlerInput.requestEnvelope).reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speakOutput = 'Sorry, I had trouble processing your request. Please try again.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StartQuestionnaireIntentHandler,
        AnswerIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
