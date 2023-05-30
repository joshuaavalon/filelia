import { createStyles, Group, Radio, rem } from "@mantine/core";
import { useSearchCondFormContext } from "./context";

import type { FC } from "react";

const useStyles = createStyles(theme => {
  const borderColor =
    theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2];
  return {
    root: {
      borderBottom: `${rem(1)} solid ${borderColor}`,
      paddingBottom: theme.spacing.md
    }
  };
});

export interface Props {}

const Component: FC<Props> = () => {
  const { classes } = useStyles();
  const form = useSearchCondFormContext();
  return (
    <Radio.Group
      mt="sm"
      label="Condition"
      className={classes.root}
      {...form.getInputProps("condition")}
    >
      <Group position="apart" mt="xs">
        <Radio value="and" label="And" />
        <Radio value="or" label="Or" />
        <Radio value="not" label="Not" />
      </Group>
    </Radio.Group>
  );
};

Component.displayName = "SearchPage/Aside/InputSection/CondInput";
export default Component;
