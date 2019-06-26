@echo off
setlocal EnableDelayedExpansion
echo ***************************************************************************
echo                build_all.bat
echo                     by niuren.zhu
echo                           2017.01.13
echo  ˵����
echo     1. �˽ű���Ҫ��Node.js command prompt�����С�
echo     2. ������ǰĿ¼��������Ŀ¼������tsconfig.json����롣
echo     3. ����1��tsc����������������磺-w����ʾ�����ļ��仯��
echo ****************************************************************************
REM ���ò�������
REM ����Ŀ¼
SET WORK_FOLDER=%~dp0
REM ������Ŀ¼����ַ����ǡ�\������
if "%WORK_FOLDER:~-1%" neq "\" SET WORK_FOLDER=%WORK_FOLDER%\
echo --������Ŀ¼��%WORK_FOLDER%
REM ��������
SET OPTIONS=%~1
REM ��������
SET COMMOND=tsc
if "%OPTIONS%" neq "" (
  SET COMMOND=start /min !COMMOND! %OPTIONS%
  echo ���!COMMOND!
)
REM ӳ���
SET IBAS_FOLDER=%IBAS_TS_LIB%
if "%IBAS_FOLDER%" equ "" (
REM û�ж��廷������
  if exist "%WORK_FOLDER%..\..\..\..\..\ibas-typescript\" (
    SET IBAS_FOLDER=%WORK_FOLDER%..\..\..\..\..\ibas-typescript\
  )
)

REM ��鲢ӳ���
if "%IBAS_FOLDER%" neq "" (
echo --�����������
  if not exist %WORK_FOLDER%3rdparty\ibas mklink /d .\3rdparty\ibas %IBAS_FOLDER%ibas\ > nul
  if not exist %WORK_FOLDER%3rdparty\openui5 mklink /d .\3rdparty\openui5 %IBAS_FOLDER%openui5\ > nul
  if not exist %WORK_FOLDER%3rdparty\shell mklink /d .\3rdparty\shell %IBAS_FOLDER%shell\ > nul
)

REM ������Ŀ����
SET TS_CONFIGS=tsconfig.json
SET TS_CONFIGS=%TS_CONFIGS% bsui\c\tsconfig.json
SET TS_CONFIGS=%TS_CONFIGS% bsui\m\tsconfig.json

FOR %%l IN (%TS_CONFIGS%) DO (
  SET TS_CONFIG=%%l
  echo --��ʼ���룺!TS_CONFIG!
  call !COMMOND! -p !TS_CONFIG!
)
