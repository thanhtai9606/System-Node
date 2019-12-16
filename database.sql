use ERPDatabase

CREATE DATABASE ERPDatabase ON 
 (FILENAME= N'/home/dunglt/ERPData/ERPDatabase.mdf') 
FOR ATTACH; 

DROP DATABASE databaseName
Go;
CREATE VIEW Location.vProvince
	AS
			select * from Location.Province

CREATE VIEW Location.vDistrict
AS	
	select * from Location.District
	
CREATE PROCEDURE spDemo
@EmpCode NVARCHAR(10)
AS
BEGIN
	SELECT * FROM HumanResources.Employee where EmpCode =@EmpCode
END 
GO

select * from Location.vProvince
use ERPDatabase
drop proc HumanResources.spLogin
CREATE PROC HumanResources.spLogin(
		@EmpCode NVARCHAR(20),
		@Password NVARCHAR(20)
		)
			AS
				BEGIN
					SELECT * from HumanResources.Employee emp
					JOIN Person.Password pw ON emp.BusinessEntityID = pw.BusinessEntityID 					
					JOIN Person.Person ps ON ps.BusinessEntityID = emp.BusinessEntityID
					WHERE emp.EmpCode = @EmpCode and pw.PasswordHash = @Password
				END

EXEC HumanResources.spLogin '633438','abc'

--- Create Culture.spGlobalView
CREATE PROC Culture.spGlobalView
( 
	@ControlID INT,
	@ControlName NVARCHAR(50),
	@Vn NVARCHAR(150),
	@Eng NVARCHAR(150),
	@Description NVARCHAR(150),
	@Sql NVARCHAR(10)
)
	AS
		BEGIN
			IF(@Sql ='CREATE')
				BEGIN
					INSERT INTO Culture.GlobalValue(ControlName,Vn,Eng,Description) VALUES(@ControlName,@Vn,@Eng,@Description)
				END 
				ELSE
				if(@sql ='UPDATE')
					BEGIN
						UPDATE Culture.GlobalValue
							SET ControlName =COALESCE(@ControlName, ControlName),
							    Vn = COALESCE(@Vn, Vn),
							    Eng = COALESCE(@Eng, Eng),
							    Description =COALESCE(@Description, Description)
							    Where ControlID = @ControlID
					END 
			END
drop proc Culture.spGlobalView
EXEC Culture.spGlobalView 40,'123','456','ax','xNO DESC','update'
SELECT * FROM Culture.GlobalValue

-- Province Severside Search--
drop proc Location.spProvinceServerside
CREATE PROC Location.spProvinceServerside
(
@DisplayLength int,
@DisplayStart int,
@SortCol int,
@SortDir nvarchar(20),
@Search NVARCHAR(255) =NULL
)
	AS
		BEGIN
			DECLARE @FirstRec int, @LastRec INT
			SET @FirstRec = @DisplayStart;
			SET @LastRec = @DisplayStart +@DisplayLength;
			WITH CTE_Province AS
			(
				SELECT ROW_NUMBER() over (ORDER BY
					CASE when (@SortCol =0 and @SortDir ='asc')
						then ProvinceID
						end ASC,
					CASE WHEN (@SortCol =0 and @SortDir ='desc')
						then ProvinceID
						end DESC,
					CASE when (@SortCol =1 and @SortDir ='asc')
						then ProvinceName
						end ASC,
					CASE WHEN (@SortCol =1 and @SortDir ='desc')
						then ProvinceName
						end DESC,
					CASE when (@SortCol =2 and @SortDir ='asc')
						then EnglishName
						end ASC,
					CASE WHEN (@SortCol =2 and @SortDir ='desc')
						then EnglishName
						end DESC,
					CASE when (@SortCol =3 and @SortDir ='asc')
						then "Level"
						end ASC,
					CASE WHEN (@SortCol =3 and @SortDir ='desc')
						then "Level"
						end DESC
				) AS RowNum,
				COUNT(*) OVER() AS Total, ProvinceID, ProvinceName, EnglishName, Level 
				FROM Location.Province
				WHERE (@Search IS NULL
						Or ProvinceID LIKE '%' + @Search +'%'
						Or ProvinceName LIKE '%' + @Search +'%'
						Or EnglishName LIKE '%' + @Search +'%'
						Or "Level" LIKE '%' + @Search +'%')
			
			)
			SELECT * FROM CTE_Province
			WHERE RowNum > @FirstRec and RowNum <= @LastRec
		END 
		
	EXEC Location.spProvinceServerSide 50,0,3,'asc',N'Phố'
	
	DELETE FROM Location.Province WHERE ProvinceID =131

	-- District Severside Search--
drop proc Location.spDistrictServerside
CREATE PROC Location.spDistrictServerside
(
@DisplayLength int,
@DisplayStart int,
@SortCol int,
@SortDir nvarchar(20),
@Search NVARCHAR(255) =NULL
)
	AS
		BEGIN
			DECLARE @FirstRec int, @LastRec INT
			SET @FirstRec = @DisplayStart;
			SET @LastRec = @DisplayStart +@DisplayLength;
			WITH CTE_Province AS
			(
				SELECT ROW_NUMBER() over (ORDER BY
					CASE when (@SortCol =0 and @SortDir ='asc')
						then DistrictID
						end ASC,
					CASE WHEN (@SortCol =0 and @SortDir ='desc')
						then DistrictID
						end DESC,
					CASE when (@SortCol =1 and @SortDir ='asc')
						then DistrictName
						end ASC,
					CASE WHEN (@SortCol =1 and @SortDir ='desc')
						then DistrictName
						end DESC,
					CASE when (@SortCol =2 and @SortDir ='asc')
						then EnglishName
						end ASC,
					CASE WHEN (@SortCol =2 and @SortDir ='desc')
						then EnglishName
						end DESC,
					CASE when (@SortCol =3 and @SortDir ='asc')
						then "Level"
						end ASC,
					CASE WHEN (@SortCol =3 and @SortDir ='desc')
						then "Level"
						end DESC,
					CASE when (@SortCol =4 and @SortDir ='asc')
						then "ProvinceID"
						end ASC,
					CASE WHEN (@SortCol =4 and @SortDir ='desc')
						then "ProvinceID"
						end DESC,
					CASE when (@SortCol =5 and @SortDir ='asc')
						then "ProvinceName"
						end ASC,
					CASE WHEN (@SortCol =5 and @SortDir ='desc')
						then "ProvinceName"
						end DESC						
				) as RowNum,
				COUNT(*) OVER() AS Total, DistrictID, DistrictName, EnglishName, Level, ProvinceID, ProvinceName 
				FROM Location.vDistrict
				WHERE (@Search IS NULL
						Or DistrictID LIKE '%' + @Search +'%'
						Or DistrictName LIKE '%' + @Search +'%'
						Or EnglishName LIKE '%' + @Search +'%'
						Or "Level" LIKE '%' + @Search +'%'
						Or "ProvinceID" LIKE '%' + @Search +'%'
						Or "ProvinceName" LIKE '%' + @Search +'%')
			
			)
			SELECT * FROM CTE_Province
			WHERE RowNum > @FirstRec and RowNum <= @LastRec
		END 
		
	EXEC Location.spDistrictServerSide 10,0,0,'asc',N''
	
	DELETE FROM Location.Province WHERE ProvinceID =131
	
	
	
	
	-- xDistrict Severside Search--
drop proc Location.spWardServerside
CREATE PROC Location.spWardServerside
(
@DisplayLength int,
@DisplayStart int,
@SortCol int,
@SortDir nvarchar(20),
@Search NVARCHAR(255) =NULL
)
	AS
		BEGIN
			DECLARE @FirstRec int, @LastRec INT
			SET @FirstRec = @DisplayStart;
			SET @LastRec = @DisplayStart +@DisplayLength;
			WITH CTE_Province AS
			(
				SELECT ROW_NUMBER() over (ORDER BY
					CASE when (@SortCol =0 and @SortDir ='asc')
						then WardID
						end ASC,
					CASE WHEN (@SortCol =0 and @SortDir ='desc')
						then WardID
						end DESC,
					CASE when (@SortCol =1 and @SortDir ='asc')
						then WardName
						end ASC,
					CASE WHEN (@SortCol =1 and @SortDir ='desc')
						then WardName
						end DESC,
					CASE when (@SortCol =2 and @SortDir ='asc')
						then EnglishName
						end ASC,
					CASE WHEN (@SortCol =2 and @SortDir ='desc')
						then EnglishName
						end DESC,
					CASE when (@SortCol =3 and @SortDir ='asc')
						then "Level"
						end ASC,
					CASE WHEN (@SortCol =3 and @SortDir ='desc')
						then "Level"
						end DESC,
						CASE when (@SortCol =4 and @SortDir ='asc')
						then "DistrictID"
						end ASC,
					CASE WHEN (@SortCol =4 and @SortDir ='desc')
						then "DistrictID"
						end DESC
				) as RowNum,
				COUNT(*) OVER() AS Total, WardID, WardName, EnglishName, Level, DistrictID, DistrictName 
				FROM Location.vWard
				WHERE (@Search IS NULL
						Or WardID LIKE '%' + @Search +'%'
						Or WardName LIKE '%' + @Search +'%'
						Or EnglishName LIKE '%' + @Search +'%'
						Or "Level" LIKE '%' + @Search +'%'
						Or "DistrictID" LIKE '%' + @Search +'%'
						Or "DistrictName" LIKE '%' + @Search +'%')
			
			)
			SELECT * FROM CTE_Province 
			WHERE RowNum > @FirstRec and RowNum <= @LastRec
		END 
		
	EXEC Location.spWardServerSide 10,0,0,'desc',N'Bắc Tân Uyên'
drop view vWard
---Create view vWard---
CREATE VIEW Location.vWard
as 
	SELECT w.WardID, w.WardName, w.EnglishName, w."Level", w.DistrictID, d.DistrictName FROM Location.Ward w
	JOIN Location.District d on w.DistrictID = d.DistrictID
	
drop view Location.vDistrict	
CREATE VIEW Location.vDistrict
AS
	SELECT d.DistrictID, d.DistrictName, d.EnglishName, d."Level", d.ProvinceID, p.ProvinceName FROM Location.District d
	JOIN Location.Province p 
	ON d.ProvinceID = p.ProvinceID
SELECT * from Location.vDistrict		

--CRUD PROVINCE STORED PROCEDURE--
DROP PROC Location.spProvince
CREATE PROC Location.spProvince
(
	@ProvinceID nvarchar(10),
	@ProvinceName nvarchar(50),
	@EnglishName NVARCHAR(100),
	@Level NVARCHAR(50),
	@Sql nvarchar(10)
)
AS
	BEGIN
		DECLARE @Id NVARCHAR(10)
		IF(@Sql ='CREATE')
		BEGIN
			 SET @Id = (SELECT ProvinceID FROM Location.vProvince WHERE ProvinceID = @ProvinceID)
			IF(@Id IS NULL)
			BEGIN
				INSERT INTO Location.Province (ProvinceID, ProvinceName,EnglishName,"Level") VALUES(@ProvinceId, @ProvinceName, @EnglishName,@Level)
			END 
			ELSE
				RETURN PRINT N'ID Đã tồn tại'
		END 
		ELSE
		BEGIN
			IF(@Sql ='Update')
				UPDATE Location.Province
			SET ProvinceName = COALESCE(@ProvinceName,ProvinceName),
				EnglishName = COALESCE(@EnglishName,EnglishName),
				LEVEL = COALESCE(@Level,Level)
				WHERE ProvinceID =@ProvinceID		
		END 		
	END 
DECLARE @a NVARCHAR(200)
EXEC Location.spProvince '111','abcX','defX','cagx','CREATE', @a OUTPUT
SELECT * FROM Location.vProvince where ProvinceName =N'Tỉnh Bình Dương'



--CRUD PROVINCE STORED PROCEDURE--
DROP PROC Location.spDistrict
CREATE PROC Location.spDistrict
(
	@DistrictID nvarchar(10),
	@DistrictName nvarchar(50),
	@EnglishName NVARCHAR(100),
	@ProvinceID NVARCHAR(10),
	@Level NVARCHAR(50),
	@Sql nvarchar(10)
)
AS
	BEGIN
		DECLARE @Id NVARCHAR(10)
		IF(@Sql ='CREATE')
		BEGIN
			 SET @Id = (SELECT DistrictID FROM Location.vDistrict WHERE DistrictID = @DistrictID)
			IF(@Id IS NULL)
				INSERT INTO Location.District (DistrictID, DistrictName,EnglishName,"Level",ProvinceID) VALUES(@DistrictId, @DistrictName, @EnglishName,@Level,@ProvinceID)
		END 
		ELSE
		BEGIN
			IF(@Sql ='Update')
				UPDATE Location.District
			SET DistrictName = COALESCE(@DistrictName,DistrictName),
				EnglishName = COALESCE(@EnglishName,EnglishName),
				DistrictID = COALESCE(@DistrictID, DistrictID),
				"Level" = COALESCE(@Level,Level),
				ProvinceID = COALESCE(@ProvinceID, ProvinceID)
				WHERE DistrictID =@DistrictID		
		END 		
	END 
EXEC Location.spDistrict 'xx','WWW','def','74','zzxx','UPDATE'
SELECT * FROM Location.vDistrict where DistrictID ='111'
DELETE FROM Location.District WHERE DistrictID ='xx'


--CRUD WARD STORED PROCEDURE--
DROP PROC Location.spWard
CREATE PROC Location.spWard
(
	@WardID nvarchar(10),
	@WardName nvarchar(50),
	@EnglishName NVARCHAR(100),
	@DistrictID NVARCHAR(10),
	@Level NVARCHAR(50),
	@Sql nvarchar(10)
)
AS
	BEGIN
		DECLARE @Id NVARCHAR(10)
		IF(@Sql ='CREATE')
		BEGIN
			 SET @Id = (SELECT WardID FROM Location.vWard WHERE WardID = @WardID)
			IF(@Id IS NULL)
				INSERT INTO Location.Ward (WardID, WardName,EnglishName,"Level",DistrictID) VALUES(@WardId, @WardName, @EnglishName,@Level,@DistrictID)
		END 
		ELSE
		BEGIN
			IF(@Sql ='Update')
				UPDATE Location.Ward
			SET WardName = COALESCE(@WardName,WardName),
				EnglishName = COALESCE(@EnglishName,EnglishName),
				WardID = COALESCE(@WardID, WardID),
				"Level" = COALESCE(@Level,Level),
				DistrictID =COALESCE(@DistrictID, DistrictID)
				WHERE WardID =@WardID		
		END 		
	END 
EXEC Location.spWard 'xx','z','x','112','z','update'
SELECT * FROM Location.vWard where WardID ='xx'
DELETE FROM Location.Ward WHERE WardID ='xx'

