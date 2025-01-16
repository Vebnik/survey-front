import { Question } from "..";

export const titleQuestion = {
  title: "Анонимная анкета",
  text: "",
};

const question: Question = {
  text: "Способность передвигаться за пределами дома",
  before: [
    {
      text: "Свободно передвигался",
    },
    {
      text: "Передвигался с тростью или костылями",
    },
    {
      text: "Не способен сам передвигаться",
    },
    {
      text: "Удовлетворительно",
    },
    {
      text: "Плохо",
    },
  ],
  after: [
    {
      text: "Свободно передвигаюсь",
    },
    {
      text: "Передвигаюсь с тростью или костылями",
    },
    {
      text: "Не способен сам передвигаться",
    },
    {
      text: "Удовлетворительно",
    },
    {
      text: "Плохо",
    },
  ],
};

export const questionsData = new Array(10).fill(question);
