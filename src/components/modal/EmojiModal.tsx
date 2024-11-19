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
        <ScrollableContent>
          <EmojiGrid>
            {emojiList.map((emoji, index) => (
              <EmojiButton key={index} onClick={() => onSelectEmoji(emoji)}>
                <EmojiImg src={emoji} alt={`emoji-${index}`} />
              </EmojiButton>
            ))}
          </EmojiGrid>
        </ScrollableContent>
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
  width: 100%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 20px 20px 0 0;

  background: var(--Secondary, #ffcfc7);
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ScrollableContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const EmojiGrid = styled.div`
  display: grid;
  //grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));

  gap: 20px;
  justify-items: center;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  display: flex;
  width: 100px;
  height: 100px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  align-content: center;

  border-radius: 10px;
  background: var(--White, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const EmojiImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Line = styled.div`
  width: 53px;
  height: 5px;
  margin: 0 auto;
  border-radius: 30px;
  background: var(--Black, #3b3634);
  margin-bottom: 10px;
`;
