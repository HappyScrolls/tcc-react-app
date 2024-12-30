import ReactDOM from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "../../store/toastStore";
import sucess from "../../images/toast/success.svg";
import error from "../../images/toast/error.svg";

const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts);

  const toastVariants = {
    invisible: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return ReactDOM.createPortal(
    <Container>
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variants={toastVariants}
            initial="invisible"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Icon src={toast.type === "success" ? sucess : error} />
            <Message>{toast.message}</Message>
          </Toast>
        ))}
      </AnimatePresence>
    </Container>,
    document.body
  );
};

export default ToastContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: fixed;
  bottom: calc(80px + 25px + 14px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;

const Toast = styled(motion.div)`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  background: var(--White, #fff);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);

  color: var(--Black, #3b3634);
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const Message = styled.span`
  flex: 1;
`;
