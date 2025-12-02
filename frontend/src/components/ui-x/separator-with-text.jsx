const SeparatorWithText = ({ children, className }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 border-t" />
      <span className="text-xs text-muted-foreground">{children}</span>
      <div className="flex-1 border-t" />
    </div>
  )
}

export default SeparatorWithText