import { Box, Modal } from '@mui/material'
import React from 'react'


interface ModelProps{
    children:React.ReactNode;
    open: boolean;
    onClose: () => void;
    // title?: string;
}
export const KeepMountModal :React.FC<ModelProps> = ({open,children,onClose}) => {
  return (
    <div>
        <Modal keepMounted open={open} onClose={onClose}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change this to your desired color
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '400px', // Adjust as needed
              backgroundColor: 'background.paper',
              border: '2px solid #000',
              borderRadius:'15px',
              boxShadow: 24,
              p: 4,
            }}
          >
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
