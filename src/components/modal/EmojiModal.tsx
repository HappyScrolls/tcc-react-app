import React from "react";
import styled from "styled-components";
import emojiList from "../../images/emoji/emojiList";

const EmojiModal = ({
  onSelectEmoji,
  onClose,
}: {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Line />
        <EmojiGrid>
          {emojiList.map((emoji, index) => (
            <EmojiButton key={index} onClick={() => onSelectEmoji(emoji)}>
              <EmojiImg src={emoji} alt={`emoji-${index}`} />
            </EmojiButton>
          ))}
        </EmojiGrid>
      </ModalContent>
    </Overlay>
  );
};

export default EmojiModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 11;
`;

const ModalContent = styled.div`
  width: 80%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 20px 20px 0 0;

  background: var(--Secondary, #ffcfc7);
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-items: center;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  display: flex;
  width: 100px;
  height: 100px;
  padding: 4px 10px 4.584px 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const EmojiImg = styled.img`
  width: 80px;
  height: 91px;
`;

const Line = styled.div`
  z-index: 1;
  position: relative;

  width: 53px;
  height: 5px;
  margin: 0 auto;
  border-radius: 30px;
  background: var(--Black, #3b3634);
  border-radius: 30px;
  margin-bottom: 50px;
`;
