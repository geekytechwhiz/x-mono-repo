# Quiz Micro Frontend (MFE)

This micro frontend (MFE) component is designed to display and manage quizzes within your application. It utilizes React and integrates with various utilities and APIs to fetch and render quiz content dynamically.

## Installation

To integrate the Quiz MFE into your project, you can install it via npm:

npm i @platformx/quiz-mfe

## Usage

- Import Component: Import the QuizMfe component into your project.

  import QuizMfe from "@platformx/quiz-mfe";

- Usage: Place the QuizMfe component in your application, passing the required props (contentId, langCode, user_id and contentType).

- For fetching personalized data, just have to pass required props-(ie. user_id : "f8b07408-427d-4c6f-ae4b-8969ef03677d" and contentType : "quiz ) to api.

````
  <QuizMfe contentId={YOUR_CONTENT_ID} langCode={YOUR_LANG_CODE} contentType={YOUR_CONTENT_TYPE} user_id={YOUR_USER_ID}  />
``
## Props

* contentId: The unique identifier for the quiz content.
* langCode: The language code for the quiz content.
* user_id: The unique identifier for loggedIn user.
* contentType: The contentType is for the type of content (eg. "quiz").

## Usage Example

``` import React from "react";
import QuizMfe from "@platformx/quiz-mfe";

function App() {
  return (
    <div className="App">
      <QuizMfe contentId="YOUR_CONTENT_ID" langCode="YOUR_LANG_CODE"  contentType="YOUR_CONTENT_TYPE" user_id="YOUR_USER_ID" />
    </div>
  );
}

export default App;

````
