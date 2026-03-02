import { Tooltip, Badge } from "antd";
import { motion } from "framer-motion";

const createWiggleVariant = ({ hoverScale, hoverRotate, duration }) => ({
  rest: {
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: {
    rotate: hoverRotate,
    scale: 0.9,
    transition: { duration, ease: "easeInOut" },
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.15 },
  },
});

export function WiggleButton({
  tooltip,
  count = 0,
  active = false,
  onClick,
  children,
  size = 30,
  padding,
  hoverScale = 1.1,
  hoverRotate = [0, 15, -15, 10, -10, 0],
  duration = 0.8,
  activeBg = "#b5708c",
  inactiveBg = "#1ecf5e",
  activeHoverBg = "#b5708c",
  inactiveHoverBg = "#b5708c",
  className = "",
  textColor,
}) {
  const variants = createWiggleVariant({ hoverScale, hoverRotate, duration });

  const baseBg = active ? activeBg : inactiveBg;
  const hoverBg = active ? activeHoverBg : inactiveHoverBg;

  return (
    <Tooltip title={tooltip} className=" mr-[0.35rem]">
      <Badge size="small" count={count} overflowCount={999}
       offset={[1,6]} style={{zIndex:"10"}}>
        <motion.span
          className={`inline-block cursor-pointer ${className}`}
          style={{
            color: textColor || "#fff", // consistent white
          }}
          variants={variants}
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileTap="tap"
          onClick={onClick}
        >
          <motion.div
            initial={{ background: baseBg }}
            animate={{ background: baseBg }}
            whileHover={{
              background: hoverBg,
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            }}
            style={{
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: size,
              height: size,
              padding,
              transition: "background 0.3s ease",
            }}
          >
            {children}
          </motion.div>
        </motion.span>
      </Badge>
    </Tooltip>
  );
}

