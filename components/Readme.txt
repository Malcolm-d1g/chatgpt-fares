
The idea of this Message component is to render chat messages only which can be used in higher hierarchy components. 
This will allow it to be used in different places without rewriting the code.

To begin with, Message.js is used to render the main chat box container and the side menu;
The side menu contains a button that allows the user to clear the chat history.

 Additionally, it is used to initiate conversations in the chat box and add new messages to the list.
 It also calls the GPT-3 model to get responses and filters them to make them more readable. 
 Depending on the user's question type, the message is rendered either as a paragraph or as a list

  