import { useCallback } from "react";
import { Input, Switch } from "@mantine/core";
import { TbLanguage, TbLanguageOff } from "react-icons/tb";

import type { ChangeEventHandler, FC, ReactNode } from "react";

export interface Props {
  filter: string;
  setFilter: (value: string) => void;
  caseSensitive: boolean;
  setCaseSensitive: (value: boolean) => void;
  icon?: ReactNode;
}

const Component: FC<Props> = props => {
  const { filter, setFilter, setCaseSensitive, caseSensitive, icon } = props;
  const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => setFilter(e.currentTarget.value),
    [setFilter]
  );
  const onSwitchCHange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => setCaseSensitive(e.currentTarget.checked),
    [setCaseSensitive]
  );
  return (
    <Input
      icon={icon}
      placeholder="Filter"
      value={filter}
      onChange={onInputChange}
      rightSection={
        <Switch
          checked={caseSensitive}
          size="sm"
          onLabel={<TbLanguage size="1rem" />}
          offLabel={<TbLanguageOff size="1rem" />}
          onChange={onSwitchCHange}
        />
      }
      rightSectionWidth="4em"
      mb="md"
    />
  );
};

Component.displayName = "FilterInput";
export default Component;