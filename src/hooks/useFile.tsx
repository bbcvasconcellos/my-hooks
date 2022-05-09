import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface FileNameProps {
  name: string;
}

interface FileProps {
  file: FileNameProps;
  setFile: Dispatch<SetStateAction<FileNameProps>>;
}

interface UseFileProps {
  children: ReactNode;
}

export const FileContext = createContext({} as FileProps)

export const UseFile = ({ children }: UseFileProps) => {
  const [file, setFile] = useState<FileNameProps>({name: ''})

  return (
    <FileContext.Provider value={{ file, setFile }}>
      { children }
    </FileContext.Provider>
  )
}