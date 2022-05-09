import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface FileNameProps {
  name: string;
}

interface FileProps {
  file: FileNameProps;
  setFile: Dispatch<SetStateAction<FileNameProps>>;
  invalidFormat: boolean;
}

interface UseFileProps {
  children: ReactNode;
  validator: RegExp | string;
}

export const FileContext = createContext({} as FileProps)

const FileProvider = ({ children, validator }: UseFileProps) => {
  const [file, setFile] = useState<FileNameProps>({ name: '' });
  const [invalidFormat, setInvalidFormat] = useState(true);

  let validateFile: RegExp | string = '';

  if(typeof validator === 'string') {
    validateFile = /validator/;
  } else {
    validateFile = validator
  }

  useEffect(() => {
    if(!validateFile || !file || !file?.name?.match(validateFile)) {
      setInvalidFormat(true)
    } else {
      setInvalidFormat(false)
    }
  }, [file, validateFile]);

  return (
    <FileContext.Provider value={{ file, setFile, invalidFormat }}>
      { children }
    </FileContext.Provider>
  )
}

const useFile = () => {
  const context = useContext(FileContext);

  return context;
}

export { useFile, FileProvider }