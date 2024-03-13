# Quiz Micro Frontend (MFE)

This micro frontend (MFE) component is designed to display and manage quizzes within your application. It utilizes React and integrates with various utilities and APIs to fetch and render quiz content dynamically.

## Installation

To integrate the Quiz MFE into your project, you can install it via npm:

npm i @platformx/quiz-mfe

## Usage

- Import Component: Import the QuizMfe component into your project.

  import QuizMfe from "@platformx/quiz-mfe";

- Usage: Place the QuizMfe component in your application, passing the required props (contentId, langCode, cugId, uhId, widgetId) and for filter tha data there is one optional props (filters).

````
  <QuizMfe contentId={YOUR_CONTENT_ID} langCode={YOUR_LANG_CODE} cugId={YOUR_CORPORATE_ID} uhId={YOUR_USER_ID} widgetId={YOUR_WIDGET_ID} filters={YOUR_FILTER_OPTION} />
``
## Props

* contentId: The unique identifier for the quiz content.
* langCode: The language code for the quiz content.
* cugId: The unique identifier for the corporate id.
* uhId: The unique identifier for loggedIn user.
* contentType: The contentType is for the type of content (eg. "quiz").
* widgetId: Your widget id.
* filters: The filter props is optional and it will be an array (eg. ["A","F"]).

## Usage Example

``` import React from "react";
import QuizMfe from "@platformx/quiz-mfe";

function App() {
  return (
    <div className="App">
      <QuizMfe contentId="YOUR_CONTENT_ID" langCode="YOUR_LANG_CODE"  cugId="YOUR_CORPORATE_ID" uhId="YOUR_USER_ID" widgetId="YOUR_WIDGET_ID" filters="YOUR_FILTER_ARRAY" />
    </div>
  );
}

export default App;

````
