import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkServerSession } from './lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies(); // <-- Fix: Await the cookies() function
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  // Якщо немає accessToken, але є refreshToken — спробуємо оновити сесію.
  if (!accessToken) {
    if (refreshToken) {
      // Викликаємо checkServerSession і очікуємо, що вона поверне об'єкт відповіді.
      const data = await checkServerSession();

      // Додаємо перевірку, щоб переконатися, що 'data' має властивість 'headers'
      if (typeof data === 'object' && data !== null && 'headers' in data) {
        // Use an explicit type assertion for type safety
        const responseData = data as { headers: Record<string, string | string[]> };
        const setCookie = responseData.headers['set-cookie'];

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          }

          // Якщо сесія все ще активна, спрямовуємо користувача на правильний маршрут.
          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/', request.url), {
              headers: {
                'Set-Cookie': cookieStore.toString(),
              },
            });
          }
          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                'Set-Cookie': cookieStore.toString(),
              },
            });
          }
        }
      }
    }
    
    // Якщо сесія не дійсна або refresh-токен відсутній
    if (isPublicRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // Якщо accessToken існує
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};






// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import { parse } from 'cookie';
// import { checkServerSession } from './lib/api/serverApi';

// const privateRoutes = ['/profile', '/notes'];
// const publicRoutes = ['/sign-in', '/sign-up'];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken')?.value;
//   const refreshToken = cookieStore.get('refreshToken')?.value;

//   const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
//   const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

//   if (!accessToken) {
//     if (refreshToken) {
//       // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для публічного маршруту,
//       // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до публічного маршруту.
//       const data = await checkServerSession();
//       const setCookie = data.headers['set-cookie'];

//       if (setCookie) {
//         const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
//         for (const cookieStr of cookieArray) {
//           const parsed = parse(cookieStr);
//           const options = {
//             expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
//             path: parsed.Path,
//             maxAge: Number(parsed['Max-Age']),
//           };
//           if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
//           if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
//         }
//         // Якщо сесія все ще активна:
//         // для публічного маршруту — виконуємо редірект на головну.
//         if (isPublicRoute) {
//           return NextResponse.redirect(new URL('/', request.url), {
//             headers: {
//               Cookie: cookieStore.toString(),
//             },
//           });
//         }
//         // для приватного маршруту — дозволяємо доступ
//         if (isPrivateRoute) {
//           return NextResponse.next({
//             headers: {
//               Cookie: cookieStore.toString(),
//             },
//           });
//         }
//       }
//     }
//     // Якщо refreshToken або сесії немає:
//     // публічний маршрут — дозволяємо доступ
//     if (isPublicRoute) {
//       return NextResponse.next();
//     }

//     // приватний маршрут — редірект на сторінку входу
//     if (isPrivateRoute) {
//       return NextResponse.redirect(new URL('/sign-in', request.url));
//     }
//   }

//   // Якщо accessToken існує:
//   // публічний маршрут — виконуємо редірект на головну
//   if (isPublicRoute) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
//   // приватний маршрут — дозволяємо доступ
//   if (isPrivateRoute) {
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
// };
