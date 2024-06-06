export default function ToggleIcon({ toggled, onToggle, onIcon, offIcon }) {
  return <i onClick={() => onToggle(!toggled)}>{toggled ? onIcon : offIcon}</i>;
}
