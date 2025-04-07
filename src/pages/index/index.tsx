import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Spacer,
  Switch,
} from "@nextui-org/react";
import { useState } from "react";
import { InfoIcon } from "@nextui-org/shared-icons";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState<boolean>(
    localStorage.getItem("isAgreement") === "true",
  );

  const onAgreement = (isSelected: boolean) => {
    localStorage.setItem("isAgreement", `${isSelected}`);
    setSuccess(isSelected);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 scale-in-center">
        <Card className="rounded-md bg-bismark-100">
          <CardHeader className="flex justify-center items-center gap-2">
            <div className="text-xl">Согласие на обработку данных</div>
            <InfoIcon className="text-[32px] text-yellow-500" />
          </CardHeader>
          <CardBody>
            <div>
              <span className="text-[20px]">
                Здравствуйте, уважаемый пациент!
              </span>
              <br />
              <span>
                Иркутский научный институт хирургии и травматологии совместно с
                Иркутским государственным медицинским университетом проводят
                исследование для оценки эффективности операции по замене
                тазобедренного сустава.
              </span>
              <br />
              <span>
                Исследование направлено на развитие ортопедической помощи
                населению. Просим Вас принять участие в анонимном опросе. Анкета
                расположена ниже. Внимательно прочитайте вопросы анкеты и
                варианты ответов на них. Выберите варианты ответов, в наибольшей
                степени отражающие Вашу точку зрения и поставьте галочки в
                ячейках таблицы рядом с пунктами, которые соответствуют Вашей
                оценке. Опрос проводится анонимно. Персональные данные при
                обобщении и обработки результатов оценки раскрываться не будут.
                Опрос проводится с разрешения этического комитета клиники.
              </span>
              <br />
              <span>
                Если у Вас возникнут вопросы, связанные с заполнением анкеты,
                пожалуйста, свяжитесь с нами по электронной почте
              </span>
              <Chip className="mx-1 bg-bismark-200 hover:bg-bismark-300 transition-all">
                koryakvalentina@list.rus
              </Chip>
              <span>или по номеру телефона</span>
              <Chip className="mx-1 bg-bismark-200 hover:bg-bismark-300 transition-all">
                +7-908-660-64-80
              </Chip>
              (Viber, WhatsApp, Telegram).
              <br />
              <span>Благодарим Вас за помощь в исследовании!</span>
              <Spacer />
              <br />
              <span>
                С уважением, администрация Федерального государственного
                бюджетного научного учреждения «Иркутский научный центр хирургии
                и травматологии» Министерства науки и высшего образования
                Российской Федерации (664003, СФО, Иркутская область, г.
                Иркутск, ул. Борцов Революции, 1).
              </span>
            </div>
          </CardBody>
          <CardFooter className="flex flex-row justify-between">
            <Switch
              className="bg-bismark-300 p-1 rounded-md"
              color="success"
              isSelected={success}
              onValueChange={onAgreement}
            >
              <span className=" font-semibold text-[14px]">
                Вы поняли условия анкетирования и согласны пройти опрос?
              </span>
            </Switch>
            <Button
              className="bg-bismark-300"
              isDisabled={!success}
              onPress={() => navigate("/survey")}
            >
              Далее
            </Button>
          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  );
}
