import React from "react";
import { MainTemplate } from "../components/templates/MainTemplate";
import Markdown from "markdown-to-jsx";
//@ts-ignore
import todoGoist from "https://api.github.com/gists/6124eed7dab71f492c454b62369dbd09";
const todoMarkdown = todoGoist?.files["todo.md"]?.content;

const Changelog = () => {
  return (
    <MainTemplate>
      <h1>Changelog</h1>
      <p>WIP... (early early alpha)</p>
      <h2>TODO</h2>
      {todoMarkdown && <Markdown>{todoMarkdown}</Markdown>}
    </MainTemplate>
  );
};

export default Changelog;
