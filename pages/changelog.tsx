import React from "react";
import { MainTemplate } from "../components/templates/MainTemplate";

const Changelog = () => {
  return (
    <MainTemplate>
      <h1>Changelog</h1>
      <p>WIP... (early early alpha)</p>
      <h2>TODO</h2>
      <ul>
        <li>Add missing invalidations</li>
        <li>Better error handling</li>
        <li>Ability to delete our calendars & comments</li>
        <li>Ability to report calendars & comments</li>
        <li>Ability to respond to comments</li>
        <li>Ability to see if the creator posted this comment</li>
        <li>iCal compatible</li>
        <li>More auth providers (apple, github, facebook?, email?)</li>
        <li>Better user profiles (random image + name)</li>
        <li>Start to populate with real calendars</li>
        <li>Better comment date formatting (submitted 2 days ago)</li>
        <li>Styling (+ dark mode base on system style)</li>
      </ul>
    </MainTemplate>
  );
};

export default Changelog;
