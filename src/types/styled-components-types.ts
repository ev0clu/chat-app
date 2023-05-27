interface ThemeProps {
  $themeColor: string;
}

interface DotProps {
  $delay: string;
}

interface MessagesWrapperProps {
  $orientation: string;
}

interface BackgroundImageProps {
  $backgroundImage: string;
}

interface SelectingProps {
  $themeColor: string;
  $backgroundColor: boolean;
}

interface MissingChatInfoProps {
  $boxShadow?: string;
}

interface MissingUserInfoProps {
  $themeColor: string;
  $boxShadow: string;
}

export type {
  ThemeProps,
  DotProps,
  MessagesWrapperProps,
  BackgroundImageProps,
  SelectingProps,
  MissingChatInfoProps,
  MissingUserInfoProps
};
