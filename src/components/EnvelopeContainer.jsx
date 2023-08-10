import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import EnvelopeContainerDetails from "./EnvelopeContainerDetails";
import Input from "./Input";
import Envelope from "./Envelope";

const EnvelopeContainer = () => {
  return (
    <div className="w-[400px] border h-full flex flex-col gap-3 p-5">
      <EnvelopeContainerDetails />
      <Input
        variant="filled"
        startAdornment={<SearchRoundedIcon />}
        config={{
          placeholder: "Search",
        }}
      />
      <div className="flex flex-col">
        <Envelope />
        <Envelope />
        <Envelope />
        <Envelope />
        <Envelope />
      </div>
    </div>
  );
};

export default EnvelopeContainer;
