// this file is not in used 
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/User.js';

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: '/api/auth/google/callback',
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const email = profile.emails[0].value;
//                 let user = await User.findOne({ email });

//                 if (!user) {
//                     user = await User.create({
//                         fullname: profile.displayName,
//                         email,
//                         image: {
//                             url: profile.photos[0].value,
//                             public_id: null,
//                         },
//                         authMethod: 'google',
//                         category: 'Seller',
//                         plan: null,
//                         hasSelectedPlan: false,
//                     });
//                 }

//                 return done(null, user);
//             } catch (err) {
//                 return done(err, null);
//             }
//         }
//     )
// );
