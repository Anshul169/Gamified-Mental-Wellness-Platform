import { createRoot } from "react-dom/client";
import "./index.css";
import { store, persistor } from "./redux/Store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./pages/Home";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import Meditation from "./components/Meditation.jsx";
import MeditationDetail from "./pages/MeditationDetail.jsx";
import ChatRoom from "./pages/Chatroom.jsx";
import Layout from "./Layout";
import Wordle from "./pages/Wordle";
import AuthForm from "./components/AuthForm.jsx";
import About from "./pages/About.jsx";
import Journal from "./pages/Journal.jsx";
import Simon from "./pages/Simon.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="chat" element={<ChatRoom />} />
      <Route path="meditate" element={<Meditation />} />
      <Route path="user/authenticate" element={<AuthForm />} />
      <Route path="about" element={<About />} />
      <Route path="journal" element={<Journal />} />
      <Route path="game/" element={<Outlet />}>
        <Route path="wordle" element={<Wordle />} />
        <Route path="simon" element={<Simon />} />
      </Route>
      <Route path="meditation/:id" element={<MeditationDetail />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </PersistGate>
);
