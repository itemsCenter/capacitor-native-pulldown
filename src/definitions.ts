export interface DropdownPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
