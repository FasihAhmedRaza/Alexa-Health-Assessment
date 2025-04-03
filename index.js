const Alexa = require('ask-sdk-core');


// Question tree structure
const questions = require('./questions.json');


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
    
    // Handle questions that expect text/number inputs
    if (currentQuestion === "How many nights per week?") {
        return "Can you do the following activities: Walk indoors?";
    }

    const currentBranch = questionTree[currentQuestion];

    if (!currentBranch) return null;

    // Handle simple string paths
    if (typeof currentBranch === 'string') {
        return currentBranch;
    }

    // Handle text type questions
    if (currentBranch.type === "text" && currentBranch.next) {
        return currentBranch.next;
    }

    // Handle nested question paths
    if (currentBranch[normalizedAnswer]) {
        const nextNode = currentBranch[normalizedAnswer];
        
        if (typeof nextNode === 'string') {
            return nextNode;
        }
        
        if (typeof nextNode === 'object') {
            // Check if it's a text type question
            if (nextNode.type === "text" && nextNode.next) {
                return nextNode.next;
            }
            
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
        const speakOutput = ' Thanks for answering   Your care team is ill review and get back to you on next steps.   Have a nice day';
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
