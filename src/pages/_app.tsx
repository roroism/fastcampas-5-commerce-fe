import Router from 'next/router';
import { useEffect } from 'react';

import {
  ThemeProvider,
  VisuallyHidden,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';

import ToggleColorModeButton from '@components/common/ToggleColorModeButton';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { mode } from '@theme/foundations/colors';

import withAppProvider from 'contexts/app/app.provider';
import { withGlobalModalHandlerContext } from 'contexts/modal/useGlobalModalHandler.context';

// const cachedScrollPositions: number[][] = [];
// let shouldScrollRestore: { x: number; y: number } | null;

function MyApp({ Component, pageProps }: any) {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  // useEffect(() => {
  //   if ('scrollRestoration' in window.history) {
  //     window.history.scrollRestoration = 'auto';

  //     Router.events.on('routeChangeStart', () => {
  //       cachedScrollPositions.push([window.scrollX, window.scrollY]);

  //       console.log(
  //         'routeChangeStart cachedScrollPositions: ',
  //         cachedScrollPositions,
  //       );
  //     });

  //     Router.events.on('routeChangeComplete', () => {
  //       console.log(
  //         'routeChangeComplete shouldScrollRestore : ',
  //         shouldScrollRestore,
  //       );
  //       if (shouldScrollRestore) {
  //         const { x, y } = shouldScrollRestore;
  //         window.scrollTo(x, y);
  //         shouldScrollRestore = null;
  //       }
  //       window.history.scrollRestoration = 'auto';
  //     });

  //     Router.beforePopState(() => {
  //       console.log(
  //         'cachedScrollPositions, shouldScrollRestore : ',
  //         cachedScrollPositions,
  //         shouldScrollRestore,
  //       );
  //       if (cachedScrollPositions.length > 0) {
  //         console.log('before cachedScrollPositions : ', cachedScrollPositions);

  //         const [x, y]: [number, number] = cachedScrollPositions.pop() as [
  //           number,
  //           number,
  //         ];
  //         shouldScrollRestore = { x, y };
  //       }
  //       window.history.scrollRestoration = 'manual';
  //       return true;
  //     });
  //   }
  // }, []);

  return (
    // Provide the client to your App
    <ThemeProvider
      theme={{ ...theme, colors: { ...theme.colors, ...mode[colorMode] } }}
    >
      <ToggleColorModeButton />
      <VisuallyHidden as="h1">incourse run commerce</VisuallyHidden>
      <Component {...pageProps} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </ThemeProvider>
  );
}

export default withAppProvider(withGlobalModalHandlerContext(MyApp));
