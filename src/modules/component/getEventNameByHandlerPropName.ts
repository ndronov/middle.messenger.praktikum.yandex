const getEventNameByHandlerPropName = (handlerPropName: string): string => handlerPropName.replace('on', '').toLowerCase();

export default getEventNameByHandlerPropName;
