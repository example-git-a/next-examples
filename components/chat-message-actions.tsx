'use client'

import { type Message } from 'ai'

// import { Button } from '@/components/ui/button'
// import { IconCheck, IconCopy } from '@/components/ui/icons'
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';


import { useCopyToClipboard } from '@/lib/use-copy-to-clipboard'
// import { cn } from '@/lib/utils'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }

  return (
    <div
    //   className={cn(
    //     'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
    //     className
    //   )}
      {...props}
    >
      <IconButton  onClick={onCopy} size='small' >
        {isCopied ? <CheckIcon fontSize="inherit"/> : <ContentCopyIcon fontSize="inherit" />}
        {/* <span className="sr-only">Copy message</span> */}
      </IconButton>
    </div>
  )
}