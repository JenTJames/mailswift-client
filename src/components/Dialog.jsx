import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, Dialog as MuiDialog } from "@mui/material";

const Dialog = ({ handleClose, open, data, children, size }) => {
  return (
    <MuiDialog
      maxWidth={size || "md"}
      fullWidth
      onClose={handleClose}
      open={open}
    >
      <div className="p-3">
        <div className="flex items-center">
          {data?.titleIcon}
          <DialogTitle className="text-slate-500" variant="h5">
            {data?.title}
          </DialogTitle>
        </div>
      </div>
      {children && <DialogContent>{children}</DialogContent>}
    </MuiDialog>
  );
};

export default Dialog;
