import { forwardRef, useContext } from "react";
import Mdx from "#component/mdx";
import { GenericProjectContext } from "./context";

export interface Props {}

const Component = forwardRef<HTMLDivElement, Props>((_props, ref) => {
  const { description } = useContext(GenericProjectContext);
  return <Mdx ref={ref} content={description} />;
});

Component.displayName = "Description";
export default Component;
