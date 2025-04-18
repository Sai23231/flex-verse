export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  childFlex?: boolean;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, childFlex, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      style={
        childFlex
          ? {
              flexBasis: 'auto',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
            }
          : {}
      }
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
