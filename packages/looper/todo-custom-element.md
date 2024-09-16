**Custom element api**

Looper ui is being replaced by a custom element. We want it to be flexible enough to allow creating something like mirabilia, which requires adding buttons and opening a modal when it's clicked.

The state of looper can affect the content of the modal (current color is highlighted among choices),
as well as the button itself (current color).

Don't pass state in attribute:
The standard custom-element way to pass state to children is to set it as an attribute.
A part of the state of looper can be a json string. The rapidly changing part of the state like the lines would not be included. However the whole looper is required to create gifs.

Initialize every button and modal with looper, using js. Every button and modal will have a **setLooper*** method.

When a button is clicked it sends an event. A modal can also trigger events.
The events arrive in a MenuEventHandler which knows what button belongs to what modal and tells both to update.
(~ buttons and modals are children of the MenuEventHandler)

slots don't work, try something else

<div class=menu>
  <looper-buttons variant="local"/><test-button-1/><test-button-1/>
</div>
<div class="modals">
<looper-modals variant="local"/><test-modal-1/><test-modal-2/>
</div>
<looper>

or use properties, attributes? 

<script>
      import "./src/elements/TestButton1.ts";
</script>

<!--beuark-->
<looper-ui buttons="<test-button-1>"/>

OR?
<script>
   const looper = document.getElementById("looper-ui");
   // beuark
   looper.buttons = `
   <test-button-1>
   <test-button-2>`;
</script>

