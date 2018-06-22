import React from "react"
import ReactDOM from "react-dom"
import WebFont from "webfontloader"
import "./index.css"
import App from "./components/App/App"
import registerServiceWorker from "./registerServiceWorker"

WebFont.load({
  google: {
    families: ["Jua", "Share Tech Mono"]
  }
})

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
