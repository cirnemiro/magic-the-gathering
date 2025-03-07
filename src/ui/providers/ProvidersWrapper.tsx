import ReactQueryProvider from "./ReactQueryProvider";

interface IProvidersWrapperProps {
  children: React.ReactNode;
}

export const ProvidersWrapper = ({ children }: IProvidersWrapperProps) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};
