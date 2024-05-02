import React from 'react';
import { Dialog, DialogBody, Button, Typography } from "@material-tailwind/react";

function SuccessModal({ open, onClose, message }) {
  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogBody className="text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-2 bg-green-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <Typography className="font-bold">
          {message || 'Your operation has been successfully completed.'}

          </Typography>
         
          <Button color="blue" onClick={onClose} ripple={true}>
            Aceptar
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default SuccessModal;
