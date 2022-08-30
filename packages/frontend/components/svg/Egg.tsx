import { useElement } from "@/hooks";
import { Box } from "@chakra-ui/react";

type Props = {
  isActive?: boolean;
};

export default function Egg({ isActive }: Props) {
  const light = useElement(400)
  const dark = useElement(600)

  return (
    <Box position='relative' mx='auto' w='62px' h='82px' cursor='pointer' data-group>
      <Box position='absolute' bottom={0} left={0} as='svg' width="64px" height="31px" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5.55554" y="18.6782" width="38.8889" height="2.77778" fill={dark} />
        <rect x="5.17242" y="2.58594" width="38.8889" height="2.77778" fill={dark} />
        <rect x="11.1111" y="21.4556" width="27.7778" height="2.77778" fill={dark} />
        <rect x="11.1111" width="27.7778" height="2.77778" fill={dark} />
        <rect x="2.77771" y="15.9004" width="44.4444" height="2.77778" fill={dark} />
        <rect y="13.1226" width="50" height="2.77778" fill={dark} />
        <rect y="10.3447" width="50" height="2.77778" fill={dark} />
        <rect y="7.56689" width="50" height="2.77778" fill={dark} />
        <rect x="2.77771" y="4.78906" width="44.4444" height="2.77778" fill={dark} />
      </Box>
      <Box _groupHover={{ transform: 'translateY(-20px)' }} transform={isActive ? 'translateY(-20px)' : 'translateY(0)'} position='absolute' top={0} left={0} as='svg' width="64px" height="74px" viewBox="0 0 64 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6.22223" y="23.3335" width="51.5556" height="35.4444" fill="white" />
        <rect x="9.44446" y="16.8887" width="45.1111" height="45.1111" fill="white" />
        <rect x="12.6667" y="13.6665" width="38.6667" height="51.5556" fill="white" />
        <rect x="15.8889" y="10.4443" width="32.2222" height="58" fill="white" />
        <rect x="19.1111" y="7.22217" width="25.7778" height="58" fill="white" />
        <rect x="22.3333" y="68.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="25.5555" y="68.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="28.7778" y="68.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="32" y="68.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="35.2222" y="68.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="38.4445" y="68.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="41.6667" y="65.2222" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="48.1111" y="62" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="51.3333" y="58.7778" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="54.5555" y="55.5557" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="54.5555" y="52.3335" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="57.7778" y="49.1108" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="57.7778" y="45.8887" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="57.7778" y="42.6665" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="57.7778" y="39.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="57.7778" y="36.2222" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="57.7778" y="33" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="57.7778" y="29.7778" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="54.5555" y="26.5557" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="54.5555" y="23.3335" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="51.3333" y="20.1108" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="51.3333" y="16.8887" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="48.1111" y="13.6665" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="44.8889" y="10.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="41.6667" y="7.22217" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="38.4445" y="7.22217" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="35.2222" y="4" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="32" y="4" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="28.7778" y="4" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="25.5555" y="4" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="22.3333" y="7.22217" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="19.1111" y="7.22217" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="15.8889" y="10.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="12.6667" y="13.6665" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="9.44446" y="16.8887" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="9.44446" y="20.1108" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="6.22223" y="23.3335" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="6.22223" y="26.5557" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="3" y="29.7778" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="3" y="33" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="3" y="36.2222" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="3" y="39.4443" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="3" y="42.6665" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="3" y="45.8887" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="3" y="49.1108" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="6.22223" y="52.3335" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="6.22223" y="55.5557" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="9.44446" y="58.7778" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="12.6667" y="62" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="15.8889" y="65.2222" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="19.1111" y="65.2222" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="44.8889" y="65.2222" width="3.22222" height="3.22222" fill="#14181F" />
        <rect x="32" y="26.5557" width="9.66667" height="9.66667" fill="#5C5E6D" />
        <rect x="35.2222" y="23.3335" width="3.22222" height="16.1111" fill="#5C5E6D" />
        <rect x="28.7778" y="29.7778" width="16.1111" height="3.22222" fill="#5C5E6D" />
        <rect x="44.8889" y="49.1113" width="3.22222" height="3.22222" fill="#5C5E6D" />
        <rect x="41.6667" y="52.3335" width="3.22222" height="3.22222" fill="#5C5E6D" />
        <rect x="48.1111" y="52.3335" width="3.22222" height="3.22222" fill="#5C5E6D" />
        <rect x="48.1111" y="16.8887" width="3.22222" height="6.44444" fill="#5C5E6D" />
        <rect x="44.8889" y="13.6665" width="3.22222" height="6.44444" fill="#5C5E6D" />
        <rect x="15.8889" y="55.5557" width="6.44444" height="6.44444" fill="#5C5E6D" />
        <rect x="6.22223" y="29.7778" width="3.22222" height="9.66667" fill="#5C5E6D" />
        <rect x="9.44446" y="23.3335" width="3.22222" height="12.8889" fill="#5C5E6D" />
        <rect x="25.5555" y="7.22217" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="22.3333" y="10.4443" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="19.1111" y="10.4443" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="19.1111" y="13.6665" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="19.1111" y="16.8887" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="16.8887" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="16.8887" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="20.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="23.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="23.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="26.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="26.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="29.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="33" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="36.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="39.4443" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="42.6665" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="45.8887" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="49.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="52.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="55.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="22.3333" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="25.5555" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="28.7778" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="32" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="35.2222" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="38.4445" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="41.6667" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="44.8889" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="48.1111" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="51.3333" y="55.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="51.3333" y="52.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="54.5555" y="49.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="48.1111" y="55.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="44.8889" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="41.6667" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="38.4445" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="35.2222" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="32" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="28.7778" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="25.5555" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="22.3333" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="25.5555" y="55.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="22.3333" y="55.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="25.5555" y="52.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="22.3333" y="52.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="19.1111" y="52.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="52.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="49.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="45.8887" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="42.6665" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="39.4443" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="36.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="33" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="29.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="19.1111" y="42.6665" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="19.1111" y="45.8887" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="19.1111" y="49.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="22.3333" y="49.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="28.7778" y="55.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="32" y="55.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="32" y="65.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="32" y="65.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="52.3335" width="3.22222" height="6.44444" fill="#5C5E6D" />
        <rect x="22.3333" y="58.7778" width="3.22222" height="3.22222" fill="#5C5E6D" />
        <rect x="35.2222" y="65.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="38.4445" y="65.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="9.44446" y="49.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="6.22223" y="49.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="9.44446" y="52.3335" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="9.44446" y="55.5557" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="12.6667" y="58.7778" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="19.1111" y="62" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="22.3333" y="65.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="25.5555" y="65.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="28.7778" y="65.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="6.22223" y="45.8887" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="9.44446" y="45.8887" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="9.44446" y="42.6665" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="9.44446" y="39.4443" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="9.44446" y="36.2222" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="6.22223" y="39.4443" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="6.22223" y="42.6665" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="20.1113" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <rect x="15.8889" y="13.6665" width="3.22222" height="3.22222" fill="#B6BDC8" />
        <Box as='g' opacity={isActive ? 1 : 0} _groupHover={{ opacity: 1 }}>
          <rect x="-6.10352e-05" y="29.2002" width="3.2" height="3.2" fill={light} />
          <rect x="-6.10352e-05" y="32.3999" width="3.2" height="3.2" fill={light} />
          <rect x="-6.10352e-05" y="35.5996" width="3.2" height="3.2" fill={light} />
          <rect x="-6.10352e-05" y="38.7998" width="3.2" height="3.2" fill={light} />
          <rect x="-6.10352e-05" y="42" width="3.2" height="3.2" fill={light} />
          <rect x="-6.10352e-05" y="45.2002" width="3.2" height="3.2" fill={light} />
          <rect x="-6.10352e-05" y="48.3999" width="3.2" height="3.2" fill={light} />
          <rect x="3.19989" y="51.5996" width="3.2" height="3.2" fill={light} />
          <rect x="3.19989" y="54.7998" width="3.2" height="3.2" fill={light} />
          <rect x="6.40009" y="58" width="3.2" height="3.2" fill={light} />
          <rect x="9.59979" y="61.2002" width="3.2" height="3.2" fill={light} />
          <rect x="12.8" y="64.3999" width="3.2" height="3.2" fill={light} />
          <rect x="15.9999" y="67.5996" width="3.2" height="3.2" fill={light} />
          <rect x="19.1999" y="67.5996" width="3.2" height="3.2" fill={light} />
          <rect x="22.4001" y="70.7998" width="3.2" height="3.2" fill={light} />
          <rect x="25.5998" y="70.7998" width="3.2" height="3.2" fill={light} />
          <rect x="28.8" y="70.7998" width="3.2" height="3.2" fill={light} />
          <rect x="31.9999" y="70.7998" width="3.2" height="3.2" fill={light} />
          <rect x="35.1999" y="70.7998" width="3.2" height="3.2" fill={light} />
          <rect x="38.4001" y="70.7998" width="3.2" height="3.2" fill={light} />
          <rect x="41.5998" y="67.5996" width="3.2" height="3.2" fill={light} />
          <rect x="44.8" y="67.5996" width="3.2" height="3.2" fill={light} />
          <rect x="47.9999" y="64.3999" width="3.2" height="3.2" fill={light} />
          <rect x="51.1999" y="61.2002" width="3.2" height="3.2" fill={light} />
          <rect x="54.4001" y="58" width="3.2" height="3.2" fill={light} />
          <rect x="57.5998" y="54.7998" width="3.2" height="3.2" fill={light} />
          <rect x="57.5998" y="51.5996" width="3.2" height="3.2" fill={light} />
          <rect x="60.8" y="48.3999" width="3.2" height="3.2" fill={light} />
          <rect x="60.8" y="45.2002" width="3.2" height="3.2" fill={light} />
          <rect x="60.8" y="42" width="3.2" height="3.2" fill={light} />
          <rect x="60.8" y="38.7998" width="3.2" height="3.2" fill={light} />
          <rect x="60.8" y="35.5996" width="3.2" height="3.2" fill={light} />
          <rect x="60.8" y="32.3999" width="3.2" height="3.2" fill={light} />
          <rect x="60.8" y="29.2002" width="3.2" height="3.2" fill={light} />
          <rect x="57.5998" y="26" width="3.2" height="3.2" fill={light} />
          <rect x="57.5998" y="22.7998" width="3.2" height="3.2" fill={light} />
          <rect x="54.4001" y="19.5996" width="3.2" height="3.2" fill={light} />
          <rect x="54.4001" y="16.3999" width="3.2" height="3.2" fill={light} />
          <rect x="51.1999" y="13.2002" width="3.2" height="3.2" fill={light} />
          <rect x="47.9999" y="10" width="3.2" height="3.2" fill={light} />
          <rect x="44.8" y="6.7998" width="3.2" height="3.2" fill={light} />
          <rect x="41.5998" y="3.59961" width="3.2" height="3.2" fill={light} />
          <rect x="38.4001" y="3.59961" width="3.2" height="3.2" fill={light} />
          <rect x="35.1999" y="0.399902" width="3.2" height="3.2" fill={light} />
          <rect x="31.9999" y="0.399902" width="3.2" height="3.2" fill={light} />
          <rect x="28.8" y="0.399902" width="3.2" height="3.2" fill={light} />
          <rect x="25.5998" y="0.399902" width="3.2" height="3.2" fill={light} />
          <rect x="22.4001" y="3.59961" width="3.2" height="3.2" fill={light} />
          <rect x="19.1999" y="3.59961" width="3.2" height="3.2" fill={light} />
          <rect x="15.9999" y="6.7998" width="3.2" height="3.2" fill={light} />
          <rect x="12.8" y="10" width="3.2" height="3.2" fill={light} />
          <rect x="9.59979" y="13.2002" width="3.2" height="3.2" fill={light} />
          <rect x="6.40009" y="16.3999" width="3.2" height="3.2" fill={light} />
          <rect x="6.40009" y="19.5996" width="3.2" height="3.2" fill={light} />
          <rect x="3.19989" y="22.7998" width="3.2" height="3.2" fill={light} />
          <rect x="3.19989" y="26" width="3.2" height="3.2" fill={light} />
        </Box>
      </Box>
      <Box
        as='svg'
        visibility='hidden'
        // visibility={isActive ? 'visible' : 'hidden'}
        _groupHover={{ visibility: 'visible' }}
        position='absolute'
        bottom='-20px'
        left='50%'
        transform='translateX(-50%)'
        width="22px"
        height="12px"
        viewBox="0 0 22 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="2" width="2" height="2" fill="#0B001A" />
        <rect x="12" y="4" width="2" height="2" fill="#0B001A" />
        <rect x="14" y="6" width="2" height="2" fill="#0B001A" />
        <rect x="16" y="8" width="2" height="2" fill="#0B001A" />
        <rect x="18" y="8" width="2" height="2" fill="#0B001A" />
        <rect x="20" y="10" width="2" height="2" fill="#0B001A" />
        <rect y="10" width="2" height="2" fill="#0B001A" />
        <rect x="8" y="6" width="2" height="2" fill="#FECCFF" />
        <rect x="10" y="6" width="2" height="2" fill="#FECCFF" />
        <rect x="10" y="4" width="2" height="2" fill="#FECCFF" />
        <rect x="12" y="6" width="2" height="2" fill="#FECCFF" />
        <rect x="14" y="8" width="2" height="2" fill="#FECCFF" />
        <rect x="12" y="8" width="2" height="2" fill="#FECCFF" />
        <rect x="10" y="8" width="2" height="2" fill="#FECCFF" />
        <rect x="8" y="8" width="2" height="2" fill="#FECCFF" />
        <rect x="6" y="8" width="2" height="2" fill="#FECCFF" />
        <rect x="8" y="4" width="2" height="2" fill="#0B001A" />
        <rect x="6" y="6" width="2" height="2" fill="#0B001A" />
        <rect x="4" y="8" width="2" height="2" fill="#0B001A" />
        <rect x="2" y="8" width="2" height="2" fill="#0B001A" />
        <rect x="4" y="6" width="2" height="2" fill="#0B001A" />
        <rect x="6" y="4" width="2" height="2" fill="#0B001A" />
        <rect x="8" y="2" width="2" height="2" fill="#0B001A" />
        <rect x="10" width="2" height="2" fill="#0B001A" />
        <rect x="12" y="2" width="2" height="2" fill="#0B001A" />
        <rect x="14" y="4" width="2" height="2" fill="#0B001A" />
        <rect x="16" y="6" width="2" height="2" fill="#0B001A" />
        <rect x="6" y="10" width="2" height="2" fill="#0B001A" />
        <rect x="2" y="10" width="2" height="2" fill="#0B001A" />
        <rect x="4" y="10" width="2" height="2" fill="#0B001A" />
        <rect x="8" y="10" width="2" height="2" fill="#0B001A" />
        <rect x="10" y="10" width="2" height="2" fill="#0B001A" />
        <rect x="12" y="10" width="2" height="2" fill="#0B001A" />
        <rect x="14" y="10" width="2" height="2" fill="#0B001A" />
        <rect x="18" y="10" width="2" height="2" fill="#0B001A" />
        <rect x="16" y="10" width="2" height="2" fill="#0B001A" />
      </Box>
    </Box>
  )
}