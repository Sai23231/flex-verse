import React from 'react';

import { Grid, Link, Typography } from '@mui/material';

import { footerLinks, socialMedia } from '../constants/Constants';

const Footer: React.FC = () => {
  return (
    <section
      style={{
        background: 'black',
        padding: '10px 20px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={4}
        direction="column"
      >
        <Grid item container justifyContent="flex-start" spacing={2} xs={12}>
          {footerLinks.map((footerlink) => (
            <Grid key={footerlink.title} item xs={6} sm={4} md={3}>
              <Typography
                variant="h6"
                color="white"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                {footerlink.title}
              </Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {' '}
                {footerlink.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.link}
                      variant="body1"
                      color="white"
                      underline="none"
                      sx={{ cursor: 'pointer' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>

        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          xs={12}
        >
          <Typography
            variant="body1"
            color="white"
            align="left"
            sx={{ flexGrow: 1 }}
          >
            Copyright Ⓒ 2023 Flex-Verse.com - All Rights Reserved.
          </Typography>

          <Grid
            item
            container
            justifyContent="right"
            spacing={2}
            xs={12}
            md={4}
          >
            {socialMedia.map((social) => (
              <Grid key={social.id} item>
                <img
                  src={social.icon}
                  alt={social.id}
                  width={30}
                  height={30}
                  style={{ cursor: 'pointer' }}
                  onClick={() => window.open(social.link)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default Footer;
