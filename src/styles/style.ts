import { makeStyles } from '@material-ui/core/styles';

const MAIN_CONTENT_SPACING = 3;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 80,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 60,
    overflow: 'hidden',
  },
  content: {
    marginLeft: 60,
    padding: theme.spacing(MAIN_CONTENT_SPACING),
    minHeight: '100vh',
  },
  fullHeightChild: {
    height: `calc(100vh - ${theme.spacing(MAIN_CONTENT_SPACING) * 2}px)`, // スクロールさせずに、画面全体に表示する場合に使用
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary, // リンクの色をテキストの色に合わせる
  },
}));
