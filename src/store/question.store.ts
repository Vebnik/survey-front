import { create } from "zustand";
import ky from "ky";

export interface Answers {
  before_surgery: string[];
  after_six_months: string[];
}

export interface CompletedAnswers {
  before_surgery: string;
  after_six_months: string;
}

export interface Question {
  id: number;
  question: string;
  answers: Answers;
}

export interface CompletedQuestion {
  id: number;
  question: string;
  answers: CompletedAnswers;
}

type Store = {
  loading: boolean;
  success: boolean;
  date: string | null;
  pages: number;
  satisfied: "Да" | "Частично" | "Нет" | null;
  questions: Question[];

  page: number;
  completed: CompletedQuestion[];

  submit: () => Promise<void>;
  updateCompleted: (
    index: number,
    answerType: "before_surgery" | "after_six_months",
    // eslint-disable-next-line prettier/prettier
    text: string
  ) => void;
  setPage: (page: number) => void;
  setDate: (date: string) => void;
  setSuccess: (success: boolean) => void;
  setSatisfied: (satisfied: "Да" | "Частично" | "Нет") => void;
  clear: () => void;

  getStatistic: (date: { from: string; to: string }) => void;
};

export const questionsData: Question[] = [
  {
    id: 1,
    question: "Способность передвигаться за пределами дома",
    answers: {
      before_surgery: [
        "Свободно передвигался",
        "Передвигался с тростью или костылями",
        "Не способен сам передвигаться",
        "Затрудняюсь ответить",
      ],
      after_six_months: [
        "Свободно передвигаюсь",
        "Передвигаюсь с тростью или костылями",
        "Не способен сам передвигаться",
        "Затрудняюсь ответить",
      ],
    },
  },
  {
    id: 2,
    question: "Способность обслуживать себя в быту",
    answers: {
      before_surgery: [
        "Передвигался с тростью или костылями",
        "Не способен сам передвигаться",
        "Мог все делать самостоятельно",
        "Нуждался в помощи",
        "Прикован к постели",
        "Затрудняюсь ответить",
      ],
      after_six_months: [
        "Передвигаюсь с тростью или костылями",
        "Не способен сам передвигаться",
        "Могу все делать самостоятельно",
        "Нуждаюсь в помощи",
        "Прикован к постели",
        "Затрудняюсь ответить",
      ],
    },
  },
  {
    id: 3,
    question: "Трудовая занятость",
    answers: {
      before_surgery: [
        "Нуждался в помощи",
        "Прикован к постели",
        "Работал по профессии",
        "Сменил работу на более легкую",
        "Не работал",
        "Имел инвалидность",
        "Пенсионер по старости",
        "Затрудняюсь ответить",
      ],
      after_six_months: [
        "Нуждаюсь в помощи",
        "Прикован к постели",
        "Работаю по профессии",
        "Сменил работу на более легкую",
        "Не работаю",
        "Имею инвалидность",
        "Пенсионер по старости",
        "Затрудняюсь ответить",
      ],
    },
  },
  {
    id: 4,
    question: "Самооценка состояния здоровья",
    answers: {
      before_surgery: [
        "Хорошо",
        "Удовлетворительно",
        "Плохо",
        "Затрудняюсь ответить",
      ],
      after_six_months: [
        "Хорошо",
        "Удовлетворительно",
        "Плохо",
        "Затрудняюсь ответить",
      ],
    },
  },
  {
    id: 5,
    question: "Самооценка эмоционального состояния",
    answers: {
      before_surgery: [
        "Хорошо",
        "Удовлетворительно",
        "Плохо",
        "Затрудняюсь ответить",
      ],
      after_six_months: [
        "Хорошо",
        "Удовлетворительно",
        "Плохо",
        "Затрудняюсь ответить",
      ],
    },
  },
  {
    id: 6,
    question: "Общая самооценка качества жизни",
    answers: {
      before_surgery: ["Хорошо", "Удовлетворительно", "Плохо"],
      after_six_months: ["Хорошо", "Удовлетворительно", "Плохо"],
    },
  },
];

export const useQuestion = create<Store>()((set, get) => ({
  loading: false,
  success: false,
  date: null,
  pages: 6,
  satisfied: null,
  questions: questionsData,

  page: -1,
  completed: questionsData.map((el) => ({
    id: el.id,
    question: el.question,
    answers: {
      before_surgery: "",
      after_six_months: "",
    },
  })),

  submit: async () => {
    set({ loading: true });

    const state = get();

    const data = {
      date: state.date,
      satisfied: state.satisfied,
      questions: state.completed,
    };

    const api = import.meta.env.VITE_API_URL || "http://localhost:4042";

    // eslint-disable-next-line no-console
    console.log({ data });

    try {
      await ky.post(`${api}/answer/submit`, {
        json: data,
      });
    } catch (err) {
      throw err;
    } finally {
      setTimeout(() => set({ loading: false }), 1000);
    }
  },
  updateCompleted: (index, answerType, text) => {
    const state = get();

    const completed = state.completed;

    completed[index].answers[answerType] = text;

    // eslint-disable-next-line no-console
    console.log({ completed });

    return set({ completed });
  },
  setPage: (page) => set({ page }),
  setDate: (date: string) => set({ date }),
  setSatisfied: (satisfied) => set({ satisfied }),
  setSuccess: (success) => set({ success }),
  clear: () => {
    set({
      loading: false,
      date: null,
      pages: 6,
      satisfied: null,
      questions: questionsData,
      page: -1,
      completed: questionsData.map((el) => ({
        id: el.id,
        question: el.question,
        answers: {
          before_surgery: "",
          after_six_months: "",
        },
      })),
    });
  },

  getStatistic: async (date: { from: string; to: string }) => {
    set({ loading: true })

    const api = import.meta.env.VITE_API_URL || "http://localhost:4042";

    try {
      const response = await ky.post<string>(`${api}/statistic`, {
        json: { date },
      });

      const text = await response.text()

      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = `${date.from}_${date.to}.txt`;

      a.click()

    } catch (err) {
      alert(`------ Ошибка ------\n${err}\n----------------------`)
      throw err;
    } finally {
      setTimeout(() => set({ loading: false }), 1000);
    }
  },
}));
