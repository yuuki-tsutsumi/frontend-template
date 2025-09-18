import { useState } from 'react';
import { Button, Typography, Box, Modal, ButtonProps } from '@mui/material';

type BaseModalProps = {
  clickContent: React.ReactNode;
  modalText: string;
  executeButtonText: string;
  executeButtonColor?: ButtonProps['color'];
  handleExecute: () => void;
};

export const BaseModal: React.FC<BaseModalProps> = ({
  clickContent,
  modalText,
  executeButtonText,
  executeButtonColor = 'primary',
  handleExecute,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <div onClick={handleOpenModal}>{clickContent}</div>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby='confirmation-modal-title'
      >
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: '8px',
              boxShadow: 24,
              p: 3,
            }}
          >
            <Typography
              id='confirmation-modal-title'
              component='h2'
              sx={{ mb: 2, fontWeight: 'normal' }}
            >
              {modalText}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant='outlined'
                onClick={handleCloseModal}
                color='primary'
              >
                キャンセル
              </Button>
              <Button
                variant='contained'
                color={executeButtonColor}
                onClick={() => {
                  handleExecute();
                  handleCloseModal();
                }}
              >
                {executeButtonText}
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </>
  );
};
