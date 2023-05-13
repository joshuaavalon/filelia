import { Alert } from "@mantine/core";
import { MdErrorOutline } from "react-icons/md";

import type { FC } from "react";

export interface Props {
  message?: string;
}

const Component: FC<Props> = props => {
  const { message } = props;
  return message ? (
    <Alert
      icon={<MdErrorOutline size="1rem" />}
      title="Error"
      color="red"
      mt="md"
    >
      {message}
    </Alert>
  ) : (
    <></>
  );
};

Component.displayName = "ErrorMessage";
export default Component;
