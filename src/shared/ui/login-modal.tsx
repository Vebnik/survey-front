import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

import { useModals } from "@/store/modals.store";

export function LoginModal() {
  const modals = useModals();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    // eslint-disable-next-line no-console
    console.log({
      email,
      password,
    });
  };

  return (
    <Modal
      isOpen={modals.isLogin}
      onOpenChange={() => modals.setIsOpen("login", false)}
    >
      <ModalContent className="bg-bismark-100">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Вход</ModalHeader>
            <ModalBody>
              <Input
                label="Почта"
                type="email"
                value={email}
                onValueChange={(value) => setEmail(value)}
              />
              <Input
                label="Пароль"
                type="password"
                value={password}
                onValueChange={(value) => setPassword(value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Отмена
              </Button>
              <Button className="bg-bismark-300" onPress={onLogin} disabled>
                Войти
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
